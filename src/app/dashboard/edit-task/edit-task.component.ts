// edit-task.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

interface Task {
  id: number;
  priority: string;
  status: string;
  createdDate: string;
  dueDate: string;
  remark: string;
  percentage: number;
}

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {
  @Input() task!: Task;
  @Output() updated = new EventEmitter<Task>();
  @Output() cancelled = new EventEmitter<void>();

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  onSubmit() {
          this.http.put<Task>(`http://localhost:8080/api/tasks/${this.task.id}`, this.task)
              .subscribe({
                next: (updatedTask) => {
                  this.updated.emit(updatedTask);
                  this.toastr.success('✅ Task updated successfully!');
                },
                error: (err) => {
                  console.error('❌ Update failed', err);
                  this.toastr.error('❌ Failed to update task');
                }
              });
  }

  onCancel() {
    this.cancelled.emit();
  }
}
