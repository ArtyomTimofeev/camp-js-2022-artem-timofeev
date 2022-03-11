// @ts-check
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Film } from 'src/app/core/models/film';
import { Observable } from 'rxjs';

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

  public charactersData$!: Observable<any>;

  private planetsIds!: any;

  public ngOnInit(): void {
    const params = new URLSearchParams(window.location.search);
    const filmId = String(params.get('id'));
    this.filmData$ = this.filmsService.getFilmById(filmId);
    this.filmData$.subscribe(res => {
      this.planetsIds = res.planetsIds;
      this.charactersData$ = this.additionalCollectionsService.getCharacters(this.planetsIds);
    });
  }
}
