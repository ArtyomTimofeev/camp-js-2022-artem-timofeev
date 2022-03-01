import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Auth } from '@angular/fire/auth';

/**
 * Class Navbar.
 */
@Component({
  selector: 'sw-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {

  public constructor(private readonly auth: Auth) {}

  /** IsUserAuthorized flag. */
  public isUserAuthorized = true;

  public login(): void {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider);
  }
}
