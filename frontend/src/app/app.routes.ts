import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home';
import { BookingComponent } from './pages/booking';
import { LoginComponent } from './pages/login';
import { RegisterComponent } from './pages/register';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
