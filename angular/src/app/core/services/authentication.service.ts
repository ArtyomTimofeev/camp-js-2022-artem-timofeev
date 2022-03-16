import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';

/**
 * Authentication Service.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  public constructor(private readonly auth: Auth) {}

  /**
   * Login through google account.
   */
  public login(): void {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider);
  }

  /**
   * Logout through google account.
   */
  public logout(): void {
    this.auth.signOut();
  }
}
