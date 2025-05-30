import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginState } from '../models/login.model';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private state: LoginState = {
    attempts: {},
    lockoutTimers: {},
    isLockedOut: false
  };

  private stateSubject = new BehaviorSubject<LoginState>(this.state);
  state$ = this.stateSubject.asObservable();

  updateAttempts(email: string): void {
    const attempts = this.state.attempts[email] || 0;
    const newAttempts = attempts + 1;

    if (newAttempts >= 3) {
      this.state.lockoutTimers[email] = Date.now() + 10000;
      this.state.isLockedOut = true;
    }

    this.state.attempts[email] = newAttempts;
    this.stateSubject.next({ ...this.state });
  }

  resetAttempts(email: string): void {
    this.state.attempts[email] = 0;
    delete this.state.lockoutTimers[email];
    this.state.isLockedOut = false;
    this.stateSubject.next({ ...this.state });
  }

  isLockedOut(email: string): boolean {
    const lockTime = this.state.lockoutTimers[email];
    if (!lockTime) return false;
    if (Date.now() > lockTime) {
      this.resetAttempts(email);
      return false;
    }
    return true;
  }
}
