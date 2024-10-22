import { takeUntil, first, Subject } from 'rxjs';
import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
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
export class NavbarComponent implements OnDestroy {

  private readonly onDestroy$ = new Subject<void>();

  public constructor(
    public readonly authenticationService: AuthenticationService,
  ) {}

  /**  @inheritdoc */
  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  /** Log in function. */
  public onLoginClick(): void {
    this.authenticationService.login().pipe(
      first(),
      takeUntil(this.onDestroy$),
    )
      .subscribe();
  }

  /** Log out function. */
  public onLogoutClick(): void {
    this.authenticationService.logout().pipe(
      first(),
      takeUntil(this.onDestroy$),
    )
      .subscribe();
  }
}
