import { BehaviorSubject, combineLatest, switchMap } from 'rxjs';
import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/core/services/data.service';

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

  private readonly pageSize$ = new BehaviorSubject(6);

  private readonly sortField$ = new BehaviorSubject<Sort>({
    direction: 'asc',
    active: 'title',
  });

  public readonly films$ = combineLatest([
    this.pageSize$,
    this.sortField$,
  ]).pipe(
    switchMap(([pageSize, sortField]) => this.dataService.getFilms(pageSize, sortField)),
  );

  public constructor(private dataService: DataService) {}

  public filterData($event: any): void {

  }

  public onPaginateChange($event: PageEvent): void {
    this.pageSize$.next($event.pageSize);
  }

  public announceSortChange(sort: Sort): void {
    console.log(sort);
    this.sortField$.next(sort);
  }
}
