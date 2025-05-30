export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginState {
  attempts: Record<string, number>;
  lockoutTimers: Record<string, number>; // timestamp of lock expiration
  isLockedOut: boolean;
}
