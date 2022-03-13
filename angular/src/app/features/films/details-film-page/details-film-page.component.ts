import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Film } from 'src/app/core/models/film';
import { Observable } from 'rxjs';
import { PlanetMapper } from 'src/app/core/services/mappers/planet.mapper';
import { CharacterMapper } from 'src/app/core/services/mappers/character.mapper';
import { Planet } from 'src/app/core/models/planet';
import { CHARACTERS_COLLECTION, PLANETS_COLLECTION } from 'src/app/core/utils/constants';

import { ErrorData } from '@firebase/util';

import { AdditionalCollectionsService } from './../../../core/services/additional-collections.service';
import { FilmsService } from './../../../core/services/films.service';
import { Character } from './../../../core/models/character';
import { PlanetDto } from './../../../core/services/mappers/dto/planet.dto';
import { CharacterDto } from './../../../core/services/mappers/dto/character.dto';

@Component({
  selector: 'sw-details-film-page',
  templateUrl: './details-film-page.component.html',
  styleUrls: ['./details-film-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsFilmPageComponent implements OnInit {

  public filmData$: Observable<Film> = this.filmsService.getFilmById(this.getSelectedFilmId());

  public planetsData$!: Observable<Planet[]>;

  public charactersData$!: Observable<Character[]>;

  public constructor(
    private readonly filmsService: FilmsService,
    private readonly additionalCollectionsService: AdditionalCollectionsService,
    private readonly planetMapper: PlanetMapper,
    private readonly characterMapper: CharacterMapper,
    private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    this.filmData$.subscribe(filmData => {
      const { planetsIds, characterIds } = filmData;
      this.planetsData$ = this.additionalCollectionsService
        .getCollectionItems<PlanetDto, Planet>(planetsIds, this.planetMapper, PLANETS_COLLECTION);
      this.charactersData$ = this.additionalCollectionsService
        .getCollectionItems<CharacterDto, Character>(characterIds, this.characterMapper, CHARACTERS_COLLECTION);
    });
  }

  private getSelectedFilmId(): string {
    const params = new URLSearchParams(window.location.search);
    return String(params.get('id'));
  }

  public deleteFilm(id: string): void {
    try {
      this.filmsService.deleteFilm(`asddas${id}sad`);
      this.router.navigate(['']);
    } catch (error) {
      console.error(error);
    }
  }
}
