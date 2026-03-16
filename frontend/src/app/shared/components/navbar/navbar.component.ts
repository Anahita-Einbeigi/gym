import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isOpen = signal(false);
  isLoggedIn = signal(false);
  userName = signal('');

  toggleMenu() {
    this.isOpen.update(val => !val);
  }

  logout() {
    this.isLoggedIn.set(false);
    this.userName.set('');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    this.isOpen.set(false);
  }

  ngOnInit() {
    const token = localStorage.getItem('authToken');
    const name = localStorage.getItem('userName');
    if (token && name) {
      this.isLoggedIn.set(true);
      this.userName.set(name);
    }
  }
}
