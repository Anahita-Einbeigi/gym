import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  login(email: string, password: string) {
    localStorage.setItem('authToken', 'token-' + Date.now());
    localStorage.setItem('userName', email.split('@')[0]);
  }

  register(fullName: string, email: string, password: string) {
    localStorage.setItem('authToken', 'token-' + Date.now());
    localStorage.setItem('userName', fullName);
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getCurrentUser(): string | null {
    return localStorage.getItem('userName');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
