import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface SignupRequest {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface TokenResponse {
  token: string;
}

interface TaskRequest {
  priority: string;
  status: string;
  dueDate: string;
  remark: string;
}

interface Task {
  id: number;
  priority: string;
  status: string;
  createdDate: string;
  dueDate: string;
  remark: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthTaskService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // ✅ AUTH
  signup(data: SignupRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.baseUrl}/signup`, data);
  }

  login(data: LoginRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.baseUrl}/login`, data);
  }

  // ✅ TASKS
  createTask(taskData: TaskRequest): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/tasks`, taskData);
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tasks/${id}`);
  }

  updateTask(id: number, taskData: TaskRequest): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/tasks/${id}`, taskData);
  }
}
