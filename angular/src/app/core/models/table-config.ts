interface PageConfig {

  /** The current page index. */
  pageIndex: number;

  /**
   * Index of the page that was selected previously.
   */
  previousPageIndex?: number;

  /** The current page size. */
  pageSize: number;

  /** The current total number of items being paged. */
  length: number;

  /** Page size Options. */
  readonly pageSizeOptions: number[];
}

type SortDirection = 'asc' | 'desc' | '';

/** Sorting Config. */
export interface SortConfig {

  /** The id of the column being sorted. */
  active: string;

  /** The sort direction. */
  direction: SortDirection;
}

/** Table Config. */
export interface TableConfig {

  /** Page Config. */
  readonly pageConfig: PageConfig;

  /** Sort Config. */
  readonly sortConfig: SortConfig;
}
