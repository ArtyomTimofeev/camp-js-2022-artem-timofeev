import { GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { defer, Observable } from 'rxjs';

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
  public login(): Observable<UserCredential> {
    const provider = new GoogleAuthProvider();
    return defer(() => signInWithPopup(this.auth, provider));
  }

  /**
   * Logout through google account.
   */
  public logout(): Observable<void> {
    return defer(() => this.auth.signOut());
  }
}
