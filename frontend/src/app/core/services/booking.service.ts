import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8003/api';

export interface GymClass {
  id: number;
  name: string;
  trainer: string;
  training: string;
  datetime: string;
  capacity: number;
  image?: string;
  free_spots: number;
  is_full: boolean;
}

export interface Booking {
  id: number;
  user_id: number;
  class_id: number;
  class_info?: GymClass;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  // Get all available classes
  getClasses(): Observable<GymClass[]> {
    return this.http.get<GymClass[]>(`${API_URL}/classes`);
  }

  // Get user bookings
  getUserBookings(userId: number): Observable<Booking[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Booking[]>(`${API_URL}/bookings/user/${userId}`, { headers });
  }

  // Create new booking
  createBooking(userId: number, classId: number): Observable<Booking> {
    const headers = this.getAuthHeaders();
    const bookingData = {
      user_id: userId,
      class_id: classId
    };
    return this.http.post<Booking>(`${API_URL}/bookings`, bookingData, { headers });
  }

  // Cancel booking
  cancelBooking(bookingId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${API_URL}/bookings/${bookingId}`, { headers });
  }

  // Helper method to get auth headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    
    return headers;
  }
}
