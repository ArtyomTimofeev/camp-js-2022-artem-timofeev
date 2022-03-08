import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { DataService } from 'src/app/core/services/data.service';
import { FormBuilder } from '@angular/forms';

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

  /** Stream with page config. */
  public readonly pageConfig$ = new BehaviorSubject<PageEvent>({
    pageSize: 6,
    pageIndex: 0,
    length: 6,
    previousPageIndex: 0,
    currentPageNumber: 0,
  });

  private readonly sortConfig$ = new BehaviorSubject<Sort | null>({ active: 'title', direction: 'asc' });

  public readonly searchControl = this.fb.control('');

  /** Stream with films data. */
  public readonly films$ = combineLatest([
    this.pageConfig$,
    this.sortConfig$,
    this.searchControl.valueChanges.pipe(startWith(this.searchControl.value), debounceTime(1000), distinctUntilChanged()),
  ]).pipe(
    switchMap(([pageConfig, sortConfig, subjectKeyUp]) => this.dataService.getFilms(pageConfig, sortConfig, subjectKeyUp)),
  );

  /** On paginate change function.
   * @param pageEvent - PageEvent.
   */
  public onPaginateChange(pageEvent: PageEvent): void {
    this.pageConfig$.next(pageEvent);
  }

  /** On sorting change function.
   * @param sort - SortEvent.
   */
  public onSortChange(sort: Sort): void {
    this.sortConfig$.next(sort);
  }
}
