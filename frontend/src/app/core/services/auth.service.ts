import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const API_URL = 'http://localhost:8003/api';

export interface TokenResponse {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${API_URL}/users/login`, {
      email,
      password
    }).pipe(
      tap(response => {
        localStorage.setItem('authToken', response.access_token);
        localStorage.setItem('userName', response.user.name);
        localStorage.setItem('userId', response.user.id.toString());
      })
    );
  }

  register(fullName: string, email: string, password: string): Observable<any> {
    return this.http.post<TokenResponse>(`${API_URL}/users/register`, {
      name: fullName,
      email,
      password
    }).pipe(
      tap(response => {
        // After registration, also handle if token is returned
        if (response.access_token) {
          localStorage.setItem('authToken', response.access_token);
          localStorage.setItem('userName', response.user.name);
          localStorage.setItem('userId', response.user.id.toString());
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getCurrentUser(): string | null {
    return localStorage.getItem('userName');
  }

  getUserId(): number | null {
    const id = localStorage.getItem('userId');
    return id ? parseInt(id) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
