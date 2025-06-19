import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, Event, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { EditTaskComponent } from "../edit-task/edit-task.component";
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  title?: string;  // ✅ Make optional to avoid errors if missing
  priority: string;
  status: string;
  createdDate: string;
  dueDate: string;
  percentage: number;
  remark: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    HeaderComponent,
    SidebarComponent,
    EditTaskComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];  // ✅ Will hold filtered results
  searchTerm: string = '';     // ✅ Bound to search input
  childActive = false;
  selectedTask: Task | null = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.router.events.subscribe((event: Event) => {
      this.childActive = this.router.url !== '/dashboard';
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.http.get<Task[]>('http://localhost:8080/api/tasks').subscribe({
      next: (data) => {
        this.tasks = data;
        this.filteredTasks = [...this.tasks];
        this.checkDueDates();
      },
      error: (err) => {
        console.error('Failed to load tasks', err);
        this.toastr.error('❌ Failed to load tasks from server');
      }
    });
  }

  onSearchClick(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredTasks = [...this.tasks];
    } else {
      this.filteredTasks = this.tasks.filter(task =>
        (task.title || '').toLowerCase().includes(term)
      );
    }
  }


  checkDueDates(): void {
    const today = new Date();

    this.tasks.forEach(task => {
      const due = new Date(task.dueDate);
      const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays <= 1) {
        this.toastr.error(`⚠ Task #${task.id} is due in ${diffDays} day(s)!`, 'Critical Due Date', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
      } else if (diffDays <= 3) {
        this.toastr.warning(`⏳ Task #${task.id} is due in ${diffDays} day(s).`, 'Upcoming Due Date', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
      }
    });
  }

  getBadgeColor(percent: number): string {
    if (percent >= 75) return '#4caf50';
    if (percent >= 50) return '#ff9800';
    return '#f44336';
  }

  editTask(task: Task): void {
    this.selectedTask = { ...task };
  }

  onTaskUpdated(updatedTask: Task): void {
    const index = this.tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.toastr.success(`✅ Task #${updatedTask.id} updated successfully!`, 'Update');
    }
    this.selectedTask = null;
  }

  onEditCancelled(): void {
    this.selectedTask = null;
  }

  deleteTask(task: Task): void {
    if (confirm(`⚠️ Are you sure you want to delete task #${task.id}?`)) {
      this.http.delete(`http://localhost:8080/api/tasks/${task.id}`).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t.id !== task.id);
          this.toastr.success(`🗑️ Task #${task.id} deleted successfully!`, 'Delete');
        },
        error: (err) => {
          console.error('Delete failed', err);
          this.toastr.error('❌ Failed to delete task', 'Error');
        }
      });
    }
  }
}
