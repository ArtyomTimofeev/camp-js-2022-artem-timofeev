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

/**
 * DetailsFilmPage Component.
 */
@Component({
  selector: 'sw-details-film-page',
  templateUrl: './details-film-page.component.html',
  styleUrls: ['./details-film-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsFilmPageComponent {
  /** Selected film. */
  public readonly selectedFilm$ = this.filmsService.getFilmById(this.route.snapshot.paramMap.get('id') ?? '').pipe(
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  /** List of related planets. */
  public readonly relatedPlanetsList$ = this.selectedFilm$.pipe(
    switchMap(film => {
      const { planetsIds } = film;
      return this.additionalCollectionsService
        .getCollectionItems<PlanetDto, Planet>(planetsIds, this.planetMapper, PLANETS_COLLECTION);
    }),
  );

  /** List of related characters. */
  public readonly relatedCharactersList$ = this.selectedFilm$.pipe(
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

  /** Delete film function.
   * @param id - Film id.
   */
  public deleteFilm(id: string): void {
    this.filmsService.deleteFilm(id).pipe(
      first(),
    )
      .subscribe(() => this.router.navigate(['']));
  }

  /**
   * Open dialog for edit film function.
   * @param film - Film data after editing.
   */
  public openDialogForEditFilm(film: Film): void {
    this.dialog.open<DialogWithFilmFormComponent, DialogWithFilmFormData, Film>(DialogWithFilmFormComponent, {
      data: {
        film,
      },
    });
  }

  /**
   * Open dialog for add film function.
   */
  public openDialogForAddFilm(): void {
    this.dialog.open(DialogWithFilmFormComponent);
  }
}
