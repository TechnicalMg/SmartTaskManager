import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  message = '';
  loading = false;
  signupForm;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      isAdmin: [false]
    });
  }

onSubmit() {
  if (this.signupForm.valid) {
    console.log('Submitting form with value:', this.signupForm.value);  // ✅ See value before sending
    this.loading = true;
    this.http.post<{ token: string }>('http://localhost:8080/api/signup', this.signupForm.value)
      .subscribe({
        next: (res) => {
          this.loading = false;
          localStorage.setItem('token', res.token);
          alert('Signup successful!');
        },
        error: (err) => {
          this.loading = false;
          alert(err.error.message || 'Signup failed');
        }
      });
  } else {
    alert('Please fill all fields correctly.');
  }
}

}
