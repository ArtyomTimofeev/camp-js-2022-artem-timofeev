import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, startWith, switchMap, tap } from 'rxjs';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { DataService } from 'src/app/core/services/data.service';
import { FormBuilder } from '@angular/forms';
import { ASCENDING_SORT_DIRECTION, DEFAULT_SORT_ACTIVE } from 'src/app/core/utils/constants';

/**
 * Table component.
 */
@Component({
  selector: 'sw-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {

  public constructor(private dataService: DataService, private readonly fb: FormBuilder) {}

  /** Names of displayed columns array.*/
  public readonly displayedColumns: string[] = ['title', 'episodeId', 'producer', 'releaseDate'];

  /**  Page config. */
  public readonly pageConfig$ = new BehaviorSubject<PageEvent>({
    pageSize: 6,
    pageIndex: 0,
    length: 6,
    previousPageIndex: 0,
  });

  /** Sorting config.*/
  public readonly sortConfig$ = new BehaviorSubject<Sort>({
    active: DEFAULT_SORT_ACTIVE,
    direction: ASCENDING_SORT_DIRECTION,
  });

  /** Search control with search value. */
  public readonly searchControl = this.fb.control('');

  private readonly searchValue$ = this.searchControl.valueChanges.pipe(
    startWith(this.searchControl.value),
    debounceTime(1000),
    distinctUntilChanged(),
    tap(search => {
      if (search) {
        this.sortConfig$.next({
          active: DEFAULT_SORT_ACTIVE,
          direction: ASCENDING_SORT_DIRECTION,
        });
      }
    }),
  );

  /** Observable with films data. */
  public readonly films$ = combineLatest([
    this.pageConfig$,
    this.sortConfig$,
    this.searchValue$,
  ]).pipe(

    // Debounce is necessary so that the getfilms() function is not called twice due to the repeated call
    // of the next() method in the onSortChange() function.
    debounceTime(100),
    switchMap(([pageConfig, sortConfig, subjectKeyUp]) => this.dataService.getFilms(pageConfig, sortConfig, subjectKeyUp)),
  );

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
