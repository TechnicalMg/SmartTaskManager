import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    // Optionally, you could add more checks: token expiry, role, etc.
    return true;
  } else {
    // No token found → redirect to login
    router.navigate(['/login']);
    return false;
  }
};
