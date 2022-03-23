import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, startWith, switchMap, tap, Observable, takeUntil, Subject } from 'rxjs';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { FilmsService } from 'src/app/core/services/films.service';
import { FormBuilder } from '@angular/forms';

import { TableConfig } from 'src/app/core/models/table-config';

import { Film } from '../../../core/models/film';
import { DEFAULT_SORT_ACTIVE_FIELD, DEFAULT_SORT_DIRECTION, DEFAULT_DEBOUNCE_TIME } from '../../../core/utils/constants';

/**
 * FilmsPage component.
 */
@Component({
  selector: 'sw-table',
  templateUrl: './films-page.component.html',
  styleUrls: ['./films-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsPageComponent implements OnInit, OnDestroy {

  /** Names of displayed columns array.*/
  public readonly displayedColumns: readonly string[] = ['title', 'episodeId', 'producer', 'releaseDate'];

  /** Search control with search value. */
  public readonly searchControl = this.fb.control('');

  /** Table Config. */
  public readonly tableConfig$: BehaviorSubject<TableConfig>;

  /** Observable with films data. */
  public readonly films$: Observable<readonly Film[]>;

  /** Default sorting active field. */
  public readonly defaultSortActiveField: Sort['active'] = DEFAULT_SORT_ACTIVE_FIELD;

  /** Default type of Sorting. */
  public readonly defaultSortDirection: Sort['direction'] = DEFAULT_SORT_DIRECTION;

  private onDestroy$ = new Subject<void>();

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
      active: this.defaultSortActiveField,
      direction: this.defaultSortDirection,
    },
  };

  /** Search value. */
  private readonly searchValue$: Observable<string>;

  public constructor(
    private readonly filmsService: FilmsService,
    private readonly fb: FormBuilder,
  ) {
    this.tableConfig$ = new BehaviorSubject<TableConfig>(this.defaultTableConfig);

    this.searchValue$ = this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value),
      debounceTime(DEFAULT_DEBOUNCE_TIME),
      distinctUntilChanged(),
    );

    this.films$ = combineLatest([
      this.tableConfig$,
      this.searchValue$,
    ]).pipe(
      switchMap(([tableConfig, subjectKeyUp]) => this.filmsService.getFilms(tableConfig, subjectKeyUp)),
    );
  }

  /** NgOnInit. */
  public ngOnInit(): void {
    /** Reset pagination side effect. */
    const resetPaginationSideEffect$ = this.searchValue$.pipe(tap(searchValue => {
      if (searchValue) {
        this.tableConfig$.next(this.defaultTableConfig);
      }
    }), takeUntil(this.onDestroy$));
    resetPaginationSideEffect$.subscribe();
  }

  /** NgOnDestroy. */
  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  /**
   * On paginate change function.
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
    } else {
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

  /**
   * On sorting change function.
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
