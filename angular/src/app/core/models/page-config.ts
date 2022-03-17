import { PageEvent } from '@angular/material/paginator';

/** Page Config. */
export interface PageConfig extends PageEvent {

  /** Page size Options. */
  readonly pageSizeOptions: number[];
}
