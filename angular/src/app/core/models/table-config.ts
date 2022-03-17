import { Sort } from '@angular/material/sort';

import { PageConfig } from './page-config';

/** Table Config. */
export interface TableConfig {

  /** Page Config. */
  readonly pageConfig: PageConfig;

  /** Sort Config. */
  readonly sortConfig: Sort;
}
