import { BehaviorSubject, combineLatest, switchMap } from 'rxjs';
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
  /** Stream wih films data.*/
  public displayedColumns: string[] = ['title', 'episodeId', 'producer', 'releaseDate'];

  public readonly pageConfig$ = new BehaviorSubject<PageEvent>({ pageSize: 6, pageIndex: 0, length: 6, previousPageIndex: 0 });

  private readonly sortConfig$ = new BehaviorSubject<Sort | null>({ active: 'title', direction: 'asc' });

  public readonly films$ = combineLatest([
    this.pageConfig$,
    this.sortConfig$,
  ]).pipe(
    switchMap(([pageConfig, sortConfig]) => this.dataService.getFilms(pageConfig, sortConfig)),
  );

  public constructor(private dataService: DataService) {}

  public filterData(): void {
  }

  public onPaginateChange(pageEvent: PageEvent): void {

    console.log(pageEvent);
    this.pageConfig$.next(pageEvent);
  }

  public announceSortChange(sort: Sort): void {
    this.sortConfig$.next(sort);
  }

}
