import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      alert('Please fill in the form correctly.');
      return;
    }

    this.http.post<{ token: string }>('http://localhost:8080/api/login', this.loginForm.value)
      .subscribe({
        next: (res) => {
          if (res.token) {
            localStorage.setItem('token', res.token);
            alert('✅ Login successful!');
            this.router.navigate(['/dashboard']);
          } else {
            alert('❌ Login failed: Token not received.');
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          alert(err.error?.message || '❌ Login failed');
        }
      });
  }
}
