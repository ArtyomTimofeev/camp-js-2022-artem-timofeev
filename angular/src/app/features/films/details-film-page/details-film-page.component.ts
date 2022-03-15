import { Component, ChangeDetectionStrategy } from '@angular/core';
import { first, shareReplay, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Film } from 'src/app/core/models/film';
import { PlanetMapper } from 'src/app/core/services/mappers/planet.mapper';
import { CharacterMapper } from 'src/app/core/services/mappers/character.mapper';
import { CHARACTERS_COLLECTION, PLANETS_COLLECTION } from 'src/app/core/utils/constants';
import { DialogWithFilmFormComponent, DialogWithFilmFormData } from 'src/app/features/films/details-film-page/dialog-with-film-form/dialog-with-film-form.component';

import { Character } from './../../../core/models/character';
import { Planet } from './../../../core/models/planet';
import { CharacterDto } from './../../../core/services/mappers/dto/character.dto';
import { PlanetDto } from './../../../core/services/mappers/dto/planet.dto';
import { AdditionalCollectionsService } from './../../../core/services/additional-collections.service';
import { FilmsService } from './../../../core/services/films.service';

@Component({
  selector: 'sw-details-film-page',
  templateUrl: './details-film-page.component.html',
  styleUrls: ['./details-film-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsFilmPageComponent {

  public readonly selectedFilm$ = this.filmsService.getFilmById(this.route.snapshot.paramMap.get('id') ?? '').pipe(
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  public readonly planetsList$ = this.selectedFilm$.pipe(
    switchMap(film => {
      const { planetsIds } = film;
      return this.additionalCollectionsService
        .getCollectionItems<PlanetDto, Planet>(planetsIds, this.planetMapper, PLANETS_COLLECTION);
    }),
  );

  public readonly charactersList$ = this.selectedFilm$.pipe(
    switchMap(film => {
      const { charactersIds } = film;
      return this.additionalCollectionsService
        .getCollectionItems<CharacterDto, Character>(charactersIds, this.characterMapper, CHARACTERS_COLLECTION);
    }),
  );

  public constructor(
    private readonly filmsService: FilmsService,
    private readonly additionalCollectionsService: AdditionalCollectionsService,
    private readonly planetMapper: PlanetMapper,
    private readonly characterMapper: CharacterMapper,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly dialog: MatDialog,
  ) { }

  public deleteFilm(id: string): void {
    this.filmsService.deleteFilm(id).pipe(
      first(),
    )
      .subscribe(() => this.router.navigate(['']));
  }

  public editFilm(film: Film): void {
    this.dialog.open<DialogWithFilmFormComponent, DialogWithFilmFormData, Film>(DialogWithFilmFormComponent, {
      data: {
        film,
      },
    });
  }

  public addFilm(): void {
    this.dialog.open(DialogWithFilmFormComponent).afterClosed()
      .subscribe(() => this.router.navigate(['']));
  }
}
