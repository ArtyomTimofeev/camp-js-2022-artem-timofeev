import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sw-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

/**
 * Class Navbar.
 */
export class NavbarComponent {
  /** IsUserAuthorized flag. */
  public isUserAuthorized = true;

}
