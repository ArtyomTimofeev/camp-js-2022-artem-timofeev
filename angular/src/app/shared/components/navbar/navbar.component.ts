import { first } from 'rxjs';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

/**
 * Navbar Component.
 */
@Component({
  selector: 'sw-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {

  public constructor(
    public readonly auth: AngularFireAuth,
    private readonly authenticationService: AuthenticationService,
  ) {}

  /** Log in function. */
  public onLoginClick(): void {
    this.authenticationService.login().pipe(
      first(),
    )
      .subscribe();
  }

  /** Log out function. */
  public onLogoutClick(): void {
    this.authenticationService.logout().pipe(
      first(),
    )
      .subscribe();
  }
}
