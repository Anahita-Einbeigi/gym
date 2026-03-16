import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BookingService, GymClass, Booking } from '../../core/services/booking.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
  providers: [BookingService]
})
export class BookingComponent implements OnInit {
  classes = signal<GymClass[]>([]);
  userBookings = signal<Booking[]>([]);
  isLoggedIn = signal(false);
  userId = signal<number | null>(null);
  userName = signal<string | null>(null);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  bookedClassIds = signal<Set<number>>(new Set());

  constructor(
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.checkAuth();
    this.loadClasses();
    if (this.isLoggedIn()) {
      this.loadUserBookings();
    }
  }

  private checkAuth() {
    const token = this.authService.getToken();
    const userName = this.authService.getCurrentUser();
    this.isLoggedIn.set(!!token);
    this.userName.set(userName);
    
    // In a real app, extract user ID from token
    // For now, we'll use a simple approach
    if (token) {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        this.userId.set(parseInt(storedUserId));
      }
    }
  }

  private loadClasses() {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    
    this.bookingService.getClasses().subscribe({
      next: (classes) => {
        this.classes.set(classes);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading classes:', error);
        this.errorMessage.set('Failed to load classes. Using demo data.');
        this.loadDemoClasses();
        this.isLoading.set(false);
      }
    });
  }

  private loadUserBookings() {
    if (!this.userId()) return;

    this.bookingService.getUserBookings(this.userId()!).subscribe({
      next: (bookings) => {
        this.userBookings.set(bookings);
        const bookedIds = new Set(bookings.map(b => b.class_id));
        this.bookedClassIds.set(bookedIds);
      },
      error: (error) => {
        console.error('Error loading bookings:', error);
      }
    });
  }

  bookClass(classId: number) {
    if (!this.isLoggedIn()) {
      this.errorMessage.set('Please log in to book a class');
      return;
    }

    if (!this.userId()) {
      this.errorMessage.set('User ID not found. Please log in again.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    this.bookingService.createBooking(this.userId()!, classId).subscribe({
      next: (booking) => {
        this.successMessage.set('Class booked successfully!');
        this.bookedClassIds.update(ids => new Set([...ids, classId]));
        this.userBookings.update(bookings => [...bookings, booking]);
        this.isLoading.set(false);
        
        // Clear success message after 3 seconds
        setTimeout(() => this.successMessage.set(null), 3000);
      },
      error: (error) => {
        console.error('Error booking class:', error);
        this.errorMessage.set('Failed to book class. Please try again.');
        this.isLoading.set(false);
      }
    });
  }

  cancelBooking(bookingId: number, classId: number) {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    this.bookingService.cancelBooking(bookingId).subscribe({
      next: () => {
        this.successMessage.set('Booking cancelled successfully!');
        this.userBookings.update(bookings => 
          bookings.filter(b => b.id !== bookingId)
        );
        this.bookedClassIds.update(ids => {
          const newIds = new Set(ids);
          newIds.delete(classId);
          return newIds;
        });
        this.isLoading.set(false);

        // Clear success message after 3 seconds
        setTimeout(() => this.successMessage.set(null), 3000);
      },
      error: (error) => {
        console.error('Error cancelling booking:', error);
        this.errorMessage.set('Failed to cancel booking. Please try again.');
        this.isLoading.set(false);
      }
    });
  }

  private loadDemoClasses() {
    const demoClasses: GymClass[] = [
      {
        id: 1,
        name: 'Yoga Flow',
        trainer: 'Sarah Johnson',
        training: 'Yoga',
        datetime: '2026-03-17T18:00:00',
        capacity: 20,
        free_spots: 5,
        is_full: false
      },
      {
        id: 2,
        name: 'CrossFit',
        trainer: 'Mike Smith',
        training: 'HIIT',
        datetime: '2026-03-18T19:00:00',
        capacity: 20,
        free_spots: 2,
        is_full: false
      },
      {
        id: 3,
        name: 'Pilates',
        trainer: 'Emma Davis',
        training: 'Pilates',
        datetime: '2026-03-19T17:00:00',
        capacity: 20,
        free_spots: 8,
        is_full: false
      },
      {
        id: 4,
        name: 'Spinning',
        trainer: 'James Wilson',
        training: 'Cycling',
        datetime: '2026-03-20T08:00:00',
        capacity: 20,
        free_spots: 0,
        is_full: true
      }
    ];
    this.classes.set(demoClasses);
  }

  isClassBooked(classId: number): boolean {
    return this.bookedClassIds().has(classId);
  }

  getBookingForClass(classId: number): Booking | undefined {
    return this.userBookings().find(b => b.class_id === classId);
  }

  formatDateTime(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return dateString;
    }
  }
}
