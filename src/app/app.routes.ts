import { Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { CreateTaskComponent } from './dashboard/create-task/create-task.component';
import { ProfilesComponent } from './dashboard/profiles/profiles.component';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [authGuard],
    children: [
      { path: 'create', component: CreateTaskComponent },
       { path: 'profiles', component: ProfilesComponent }
      // Later you can add:
      // { path: 'update/:id', component: UpdateTaskComponent },
      // { path: 'list', component: TaskListComponent }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

