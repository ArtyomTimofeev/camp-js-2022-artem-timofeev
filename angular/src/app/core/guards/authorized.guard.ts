// import { Injectable } from '@angular/core';
// import { CanActivate, Router, UrlTree } from '@angular/router';
// import { Observable, map } from 'rxjs';

// import { AuthenticationService } from '../services/authentication.service';

// /**
//  *
//  */
// @Injectable({
//   providedIn: 'root',
// })
// export class AuthorizedGuard implements CanActivate {
//   public constructor(
//     private readonly authenticationService: AuthenticationService,
//     private readonly router: Router,
//   ) {}

//   /**
//    * @inheritdoc
//    */
//   public canActivate(): Observable<boolean> {
//     return this.authenticationService.isUserAuthorized$.pipe(
//       map(isUserAuthorized => (isUserAuthorized === true)),
//     );
//   }
// }
