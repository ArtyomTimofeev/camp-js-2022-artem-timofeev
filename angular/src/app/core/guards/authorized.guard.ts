import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { AuthenticationService } from '../services/authentication.service';

/** Allows only authorized users to enter route. */
@Injectable({
  providedIn: 'root',
})
export class AuthorizedGuard implements CanActivate {

  public constructor(
    private readonly authenticationService: AuthenticationService,
    public readonly auth: AngularFireAuth,
  ) {}

  /**
   * @inheritdoc
   */
  /** @inheritdoc */
  public canActivate(): Observable<boolean> {
    return this.authenticationService.isUserAuthorized$.pipe(
      map(isUserAuthorized => (Boolean(isUserAuthorized) === true)),
    );
  }
}
