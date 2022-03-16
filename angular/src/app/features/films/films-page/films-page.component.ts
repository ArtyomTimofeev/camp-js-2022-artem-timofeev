import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, startWith, switchMap, tap, Observable } from 'rxjs';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { FilmsService } from 'src/app/core/services/films.service';
import { FormBuilder } from '@angular/forms';

import { Film } from '../../../core/models/film';
import { DEFAULT_SORT_ACTIVE, ASCENDING_SORT_DIRECTION, DEFAULT_DEBOUNCE_TIME } from '../../../core/utils/constants';

/** Table Config. */
export interface TableConfig {

  /** Page Config. */
  pageConfig: PageConfig;

  /** Sort Config. */
  sortConfig: Sort;
}

/** Page Config. */
interface PageConfig extends PageEvent {

  /** Page size Options. */
  pageSizeOptions: number[];
}

/**
 * FilmsPage component.
 */
@Component({
  selector: 'sw-table',
  templateUrl: './films-page.component.html',
  styleUrls: ['./films-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsPageComponent {

  /** Names of displayed columns array.*/
  public readonly displayedColumns: readonly string[] = ['title', 'episodeId', 'producer', 'releaseDate'];

  /** Search control with search value. */
  public readonly searchControl = this.fb.control('');

  /** Table Config. */
  public readonly tableConfig$: BehaviorSubject<TableConfig>;

  /** Observable with films data. */
  public readonly films$: Observable<Film[]>;

  /** Default table config. */
  private readonly defaultTableConfig: TableConfig = {
    pageConfig: {
      pageSize: 6,
      pageIndex: 0,
      length: 6,
      previousPageIndex: 0,
      pageSizeOptions: [2, 3, 6],
    },
    sortConfig: {
      active: DEFAULT_SORT_ACTIVE,
      direction: ASCENDING_SORT_DIRECTION,
    },
  };

  /** Reset pagination. */
  private resetPagination(): void {
    this.tableConfig$.next(this.defaultTableConfig);
  }

  /** Search value. */
  private readonly searchValue$ = this.searchControl.valueChanges.pipe(
    startWith(this.searchControl.value),
    debounceTime(DEFAULT_DEBOUNCE_TIME),
    distinctUntilChanged(),
    tap(search => {
      if (search) {
          this.resetPagination();
        }
      }),
  );

  public constructor(
    private readonly filmsService: FilmsService,
    private readonly fb: FormBuilder,
  ) {
    this.tableConfig$ = new BehaviorSubject<TableConfig>(this.defaultTableConfig);
    this.films$ = combineLatest([
      this.tableConfig$,
      this.searchValue$,
    ]).pipe(
      switchMap(([tableConfig, subjectKeyUp]) => this.filmsService.getFilms(tableConfig, subjectKeyUp)),
    );

  }

  /** On paginate change function.
   * @param pageEvent - PageEvent.
   */
  public onPaginateChange(pageEvent: PageEvent): void {
    if (pageEvent.pageSize === this.tableConfig$.value.pageConfig.pageSize) {
      this.tableConfig$.next({
        ...this.tableConfig$.value,
        pageConfig: {
          ...this.tableConfig$.value.pageConfig,
          ...pageEvent,
        },
      });
    }
    if (pageEvent.pageSize !== this.tableConfig$.value.pageConfig.pageSize) {
      this.tableConfig$.next({
        ...this.tableConfig$.value,
        pageConfig: {
          ...this.tableConfig$.value.pageConfig,
          ...pageEvent,
          previousPageIndex: 0,
          pageIndex: 0,
        },
      });
    }
  }

  /** On sorting change function.
   * @param sort - SortEvent.
   */
  public onSortChange(sort: Sort): void {
    this.tableConfig$.next(
      {
        pageConfig: { ...this.tableConfig$.value.pageConfig, previousPageIndex: 0, pageIndex: 0 },
        sortConfig: sort,
      },
    );
  }
}
