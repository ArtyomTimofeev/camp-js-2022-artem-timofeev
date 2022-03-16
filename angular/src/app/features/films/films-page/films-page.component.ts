import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, startWith, switchMap, tap, Observable } from 'rxjs';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { FilmsService } from 'src/app/core/services/films.service';
import { FormBuilder } from '@angular/forms';

import { Film } from '../../../core/models/film';
import { DEFAULT_SORT_ACTIVE, ASCENDING_SORT_DIRECTION } from '../../../core/utils/constants';

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

  /**  Page config. */
  public readonly pageConfig$: BehaviorSubject<PageEvent>;

  /** Sorting config.*/
  public readonly sortConfig$: BehaviorSubject<Sort>;

  /** Observable with films data. */
  public readonly films$: Observable<Film[]>;

  private readonly defaultPageConfig = {
    pageSize: 6,
    pageIndex: 0,
    length: 6,
    previousPageIndex: 0,
  };

  private readonly defaultSortConfig: Sort = {
    active: DEFAULT_SORT_ACTIVE,
    direction: ASCENDING_SORT_DIRECTION,
  };

  /** Search value. */
  private readonly searchValue$ = this.searchControl.valueChanges.pipe(
    startWith(this.searchControl.value),
    debounceTime(1000),
    distinctUntilChanged(),
    tap(search => {
        if (search) {
          this.sortConfig$.next(this.defaultSortConfig);
        }
      }),
  );

  public constructor(private filmsService: FilmsService, private readonly fb: FormBuilder) {
    this.pageConfig$ = new BehaviorSubject<PageEvent>(this.defaultPageConfig);
    this.sortConfig$ = new BehaviorSubject<Sort>(this.defaultSortConfig);
    this.films$ = combineLatest([
      this.pageConfig$,
      this.sortConfig$,
      this.searchValue$,
    ]).pipe(

      // Debounce is necessary so that the getfilms() function is not called twice due to the repeated call
      // of the next() method in the onSortChange() function.
      debounceTime(100),
      switchMap(([pageConfig, sortConfig, subjectKeyUp]) => this.filmsService.getFilms(pageConfig, sortConfig, subjectKeyUp)),
    );
  }

  /** On paginate change function.
   * @param pageEvent - PageEvent.
   */
  public onPaginateChange(pageEvent: PageEvent): void {
    if (pageEvent.pageSize === this.pageConfig$.value.pageSize) {
      this.pageConfig$.next(pageEvent);
    }
    if (pageEvent.pageSize !== this.pageConfig$.value.pageSize) {
      this.pageConfig$.next({ ...pageEvent, previousPageIndex: 0, pageIndex: 0 });
    }
  }

  /** On sorting change function.
   * @param sort - SortEvent.
   */
  public onSortChange(sort: Sort): void {
    this.sortConfig$.next(sort);
    this.pageConfig$.next({ ...this.pageConfig$.value, previousPageIndex: 0, pageIndex: 0 });
  }
}
