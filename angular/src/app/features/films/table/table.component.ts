import { Component, ChangeDetectionStrategy, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
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
export class TableComponent implements OnInit {
  /** Stream wih films data.*/
  public displayedColumns: string[] = ['title', 'episodeId', 'producer', 'releaseDate'];

  public dataSource!: MatTableDataSource<any>;

  @ViewChild('paginator') public paginator!: MatPaginator;

  @ViewChild(MatSort) public matSort!: MatSort;

  public constructor(private dataService: DataService) {}

  public ngOnInit(): void {
    this.dataService.getFilms().subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    });
  }

  public filterData($event: any): void {
    this.dataSource.filter = $event.target.value;
  }

  public onPaginateChange($event: PageEvent): void {
    this.dataService.getFilms($event.pageSize).subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
    });
  }
}
