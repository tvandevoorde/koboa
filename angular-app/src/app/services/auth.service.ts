import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  register(user: { username: string; email: string; password: string }) {
    return this.http.post('/api/auth/register', user);
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ access_token: string }>('/api/auth/login', credentials).subscribe({
      next: (response) => {
        localStorage.setItem('access_token', response.access_token);
        this.loggedIn.next(true);
        this.router.navigate(['/']);
      },
      error: (err) => console.error(err),
    });
  }

  logout() {
    localStorage.removeItem('access_token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
