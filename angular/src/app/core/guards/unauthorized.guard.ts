import { Injectable } from '@angular/core';
import { CanDeactivate, Router, UrlTree } from '@angular/router';
import { first, map, Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UnauthorizedGuard implements CanDeactivate<unknown> {
  public constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router,
  ) {}

  public canDeactivate(): Observable<boolean | UrlTree> {
    return this.authenticationService.isUserAuthorized$.pipe(
      map(isAuthorized => (isAuthorized ? this.router.parseUrl('') : this.router.parseUrl(''))),
      first(),
    );
  }
}
