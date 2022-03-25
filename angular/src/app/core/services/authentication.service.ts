import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { defer, Observable, mapTo } from 'rxjs';

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
  public login(): Observable<void> {
    const provider = new GoogleAuthProvider();
    return defer(() => signInWithPopup(this.auth, provider)).pipe(mapTo(void 0));
  }

  /**
   * Logout through google account.
   */
  public logout(): Observable<void> {
    return defer(() => this.auth.signOut());
  }
}
