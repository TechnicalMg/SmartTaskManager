import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthTaskService } from '../../auth.service';  // ✅ Adjust the path if needed
import { ToastrService } from 'ngx-toastr';

interface TaskRequest {
  title: string;
  priority: string;
  status: string;
  dueDate: string;  // yyyy-MM-dd
  percentage: number; 
  remark: string;
}

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  task: TaskRequest = {
    title:'',
    priority: '',
    status: '',
    dueDate: '',
    percentage: 0,
    remark: ''
  };

  constructor(private authTaskService: AuthTaskService, private router: Router, private toastr: ToastrService) {}

onSubmit() {
  console.log('📤 Sending task:', this.task);

  this.authTaskService.createTask(this.task)
    .subscribe({
      next: () => {
        this.toastr.success('✅ Task created successfully!');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('❌ Task creation failed', err);
        this.toastr.error('❌ Failed to create task');
      }
    });
}

}
