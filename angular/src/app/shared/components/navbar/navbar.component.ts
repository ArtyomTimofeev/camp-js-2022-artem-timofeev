import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AuthenticationService } from 'src/app/core/services/authentication.service';

import { DialogWithFilmFormComponent } from '../dialog-with-film-form/dialog-with-film-form.component';

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

  public constructor(public readonly authenticationService: AuthenticationService, public dialog: MatDialog) {}

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogWithFilmFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
