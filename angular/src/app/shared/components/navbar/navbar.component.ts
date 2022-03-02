import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AuthenticationService } from 'src/app/core/services/authentication.service';

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

  public constructor(public readonly authenticationService: AuthenticationService) {}
}
