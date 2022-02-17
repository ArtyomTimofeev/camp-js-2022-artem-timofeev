import { Component } from '@angular/core';

/** Root component. */
@Component({
  selector: 'sw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  /** Title of the app. */
  public readonly title = 'sw-films';
}
