// @ts-check
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Film } from 'src/app/core/models/film';
import { Observable } from 'rxjs';

import { Planet } from 'src/app/core/models/planet';

import { AdditionalCollectionsService } from '../../../core/services/additional-collections.service';

import { FilmsService } from './../../../core/services/films.service';

@Component({
  selector: 'sw-details-film-page',
  templateUrl: './details-film-page.component.html',
  styleUrls: ['./details-film-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsFilmPageComponent implements OnInit {

  public constructor(
    private readonly filmsService: FilmsService,
    private readonly additionalCollectionsService: AdditionalCollectionsService,
  ) {}

  public filmData$!: Observable<Film>;

  public planetsData$!: Observable<Planet[]>;

  private planetsIds!: any;

  public ngOnInit(): void {
    const params = new URLSearchParams(window.location.search);
    const filmId = String(params.get('id'));
    this.filmData$ = this.filmsService.getFilmById(filmId);
    this.filmData$.subscribe(res => {
      this.planetsIds = res.planetsIds;
      this.planetsData$ = this.additionalCollectionsService.getPlanets(this.planetsIds);
      console.log(this.planetsData$);
    });
  }
}
