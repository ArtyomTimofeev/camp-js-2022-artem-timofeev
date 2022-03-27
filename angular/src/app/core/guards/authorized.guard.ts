import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

/** Allows only authorized users to enter route. */
@Injectable({
  providedIn: 'root',
})
export class AuthorizedGuard implements CanActivate {

  public constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router,
  ) {}

  /** @inheritdoc */
  public canActivate(): Observable<boolean | UrlTree> {
    return this.authenticationService.isUserAuthorized$.pipe(
      map(isUserAuthorized => (isUserAuthorized ? true : this.router.parseUrl(''))),
    );
  }
}
