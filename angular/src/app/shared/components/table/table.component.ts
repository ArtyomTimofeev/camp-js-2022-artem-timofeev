import { Component, ChangeDetectionStrategy, OnInit, OnChanges } from '@angular/core';

import { Film } from 'src/app/core/services/models/film';

import { filmMapper } from '../../../core/services/mappers/film.mapper';

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
export class TableComponent implements OnInit, OnChanges {

  private films: Film[] | [] = [];

  public constructor(private dataService: DataService) {

  }

  public ngOnInit(): void {
    this.dataService.getFilms().subscribe(response => {
      this.films = response.map(filmDocument => filmMapper.fromDto(filmDocument));
      console.log(this.films);
    });
  }

  public ngOnChanges(): void {
    this.dataService.getFilms().subscribe(response => {
      this.films = response.map(filmDocument => filmMapper.fromDto(filmDocument));
      console.log(this.films);
    });
  }

  public displayedColumns: string[] = ['title', 'episodeId', 'producer', 'releaseDate'];

  public dataSource = this.films;
}
