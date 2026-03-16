import { Routes } from '@angular/router';
import { HomeComponent, BookingComponent, LoginComponent, RegisterComponent } from './pages';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
