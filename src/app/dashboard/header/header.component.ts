import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  getRole(): string {
    const token = localStorage.getItem('token');
    if (!token) return 'Guest';
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || 'User';
  }
}
