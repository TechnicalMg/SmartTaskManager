import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.css'
})
export class ProfilesComponent implements OnInit {
  users: User[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<User[]>('http://localhost:8080/api/admin/users').subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Failed to load users', err)
    });
  }

  toggleUser(user: User) {
    const updatedStatus = !user.active;
    this.http.put(`http://localhost:8080/api/admin/users/${user.id}/status`, { active: updatedStatus })
      .subscribe({
        next: () => {
          user.active = updatedStatus;
          alert(`User ${updatedStatus ? 'activated' : 'deactivated'} successfully`);
        },
        error: (err) => {
          console.error('Failed to update user status', err);
          alert('Failed to update user status');
        }
      });
  }
}
