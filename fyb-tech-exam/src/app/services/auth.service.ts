import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly VALID_PASSWORD = 'Testpassw0rd!';

  login(email: string, password: string): boolean {
    return !!email && password === this.VALID_PASSWORD;
  }
}
