import { Routes } from '@angular/router';
import { HomeComponent } from './pages';
import { LoginComponent, RegisterComponent, BookingComponent } from './features';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'booking', component: BookingComponent },
];
