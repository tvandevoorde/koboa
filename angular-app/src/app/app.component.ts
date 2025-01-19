import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn$ = this.authService.isLoggedIn;

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.router.navigate(['/logout']);
  }

  editProfile(): void {
    // Navigeer naar het profiel bewerkingsformulier
    console.log('Edit Profile clicked');
  }
}
