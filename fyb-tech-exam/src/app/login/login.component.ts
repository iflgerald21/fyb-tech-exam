import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'; // ✅ Import this
import { CommonModule } from '@angular/common';
import { AuthStore } from '../store/auth.store';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [ FormsModule, CommonModule ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  isLockedOut = false;
  lockoutInterval: any;
  constructor(private authService: AuthService, private authStore: AuthStore, private router: Router) {}

  onSubmit(loginForm: NgForm): void {
    if (loginForm.invalid) {
    this.error = 'Please enter a valid email and password.';
    return;
  }
    if (this.authStore.isLockedOut(this.email)) {
      this.error = 'Too many failed attempts. Try again later.';
      this.isLockedOut = true;
      this.startLockoutCountdown();
      return;
    }

    const success = this.authService.login(this.email, this.password);
   
    if (success) {
      this.authStore.resetAttempts(this.email);
      this.error = '';
      this.isLockedOut = false;
      this.clearLockoutCountdown();
      this.router.navigate(['/taskList']);
    } else {
      this.authStore.updateAttempts(this.email);
      if (this.authStore.isLockedOut(this.email)) {
        this.error = 'Too many failed attempts. Try again later.';
        this.isLockedOut = true;
        this.startLockoutCountdown(); // ✅ added
      } else {
        this.error = 'Invalid email or password.';
      }
  }
}
startLockoutCountdown(): void {
    // Prevent duplicate intervals
    if (this.lockoutInterval) return;

    this.lockoutInterval = setInterval(() => {
      const stillLocked = this.authStore.isLockedOut(this.email);
      this.isLockedOut = stillLocked;

      if (!stillLocked) {
        clearInterval(this.lockoutInterval);
        this.lockoutInterval = null;
        this.error = '';
      }
    }, 1000);
  }

  clearLockoutCountdown(): void {
    if (this.lockoutInterval) {
      clearInterval(this.lockoutInterval);
      this.lockoutInterval = null;
    }
  }
  forgotPassword(): void {
    window.open('https://www.google.com', '_blank');
  }
}
