import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { EMPTY, first, shareReplay, Subject, switchMap, takeUntil, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Film } from 'src/app/core/models/film';
import { DialogWithFilmFormComponent, DialogWithFilmFormData } from 'src/app/features/films/details-film-page/dialog-with-film-form/dialog-with-film-form.component';

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
export class DetailsFilmPageComponent implements OnDestroy {
  /** Selected film. */
  public readonly selectedFilm$ = this.route.paramMap.pipe(
    switchMap(params => {
      const id = params.get('id');
      if (id !== null) {
        return this.filmsService.getFilmById(id);
      }
      this.router.navigate(['']);
      return EMPTY;
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  /** List of related planets. */
  private readonly relatedPlanetsList$ = this.selectedFilm$.pipe(
    switchMap(selectedFilm => {
      const { planetsIds } = selectedFilm;
      return this.additionalCollectionsService
        .getRelatedPlanets(planetsIds);
    }),
  );

  /** List of related planets names. */
  public readonly relatedPlanetsNames$ = this.relatedPlanetsList$.pipe(
    map(planets => planets.map(planet => planet.name)),
  );

  /** List of related characters. */
  private readonly relatedCharactersList$ = this.selectedFilm$.pipe(
    switchMap(selectedFilm => {
      const { charactersIds } = selectedFilm;
      return this.additionalCollectionsService
        .getRelatedCharacters(charactersIds);
    }),
  );

  /** List of related characters names. */
  public readonly relatedCharactersNames$ = this.relatedCharactersList$.pipe(
    map(characters => characters.map(character => character.name)),
  );

  private readonly onDestroy$ = new Subject<void>();

  public constructor(
    private readonly filmsService: FilmsService,
    private readonly additionalCollectionsService: AdditionalCollectionsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly dialog: MatDialog,
  ) { }

  /**  @inheritdoc */
  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  /** Delete film function.
   * @param id - Film id.
   */
  public onDeleteFilm(id: Film['id']): void {
    this.filmsService.deleteFilm(id).pipe(
      first(),
      takeUntil(this.onDestroy$),
    )
      .subscribe(() => this.router.navigate(['']));
  }

  /**
   * Open dialog for edit film function.
   * @param film - Film data after editing.
   */
  public onOpenDialogForEditFilm(film: Film): void {
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
