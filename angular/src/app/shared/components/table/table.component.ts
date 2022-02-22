import { Component, ChangeDetectionStrategy } from '@angular/core';

import { DataService } from './../../../core/services/data.service';

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
  public readonly films$ = this.dataService.getFilms();

  public constructor(private dataService: DataService) {
  }

  public displayedColumns: string[] = ['title', 'episodeId', 'producer', 'releaseDate'];

}
