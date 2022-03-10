import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Film } from 'src/app/core/models/film';
import { Observable } from 'rxjs';

import { FilmsService } from './../../../core/services/films.service';

@Component({
  selector: 'sw-details-film-page',
  templateUrl: './details-film-page.component.html',
  styleUrls: ['./details-film-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsFilmPageComponent implements OnInit {

  public constructor(private readonly filmsService: FilmsService) {}

  public filmData$!: Observable<Film>;

  public ngOnInit(): void {
    const params = new URLSearchParams(window.location.search);
    const filmId = String(params.get('id'));
    this.filmData$ = this.filmsService.getFilmById(filmId);
  }

}
