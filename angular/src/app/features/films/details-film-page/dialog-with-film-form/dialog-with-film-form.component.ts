import { first } from 'rxjs';
import { Router } from '@angular/router';
import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FilmsService } from 'src/app/core/services/films.service';
import { CHARACTERS_COLLECTION, PLANETS_COLLECTION } from 'src/app/core/utils/constants';

import { CharacterMapper } from '../../../../core/services/mappers/character.mapper';
import { PlanetMapper } from '../../../../core/services/mappers/planet.mapper';
import { AdditionalCollectionsService } from '../../../../core/services/additional-collections.service';

import { Film } from './../../../../core/models/film';

/** Component data. */
export interface DialogWithFilmFormData {

  /** Film. */
  readonly film: Film | null;
}

/**
 * DialogWithFilmForm Component.
 */
@Component({
  selector: 'sw-dialog-with-film-form',
  templateUrl: './dialog-with-film-form.component.html',
  styleUrls: ['./dialog-with-film-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogWithFilmFormComponent {
  /** All planets in the database. */
  public allPlanets$ = this.additionalCollectionsService.getAllCollectionItems(PLANETS_COLLECTION, this.planetMapper);

  /** All characters in the database. */
  public allCharacters$ = this.additionalCollectionsService.getAllCollectionItems(CHARACTERS_COLLECTION, this.characterMapper);

  public constructor(
    private readonly fb: FormBuilder,
    private readonly filmsService: FilmsService,
    private readonly additionalCollectionsService: AdditionalCollectionsService,
    private readonly planetMapper: PlanetMapper,
    private readonly characterMapper: CharacterMapper,
    private readonly dialogRef: MatDialogRef<DialogWithFilmFormComponent, Film>,
    private readonly router: Router,
    @Inject(MAT_DIALOG_DATA) private readonly data: DialogWithFilmFormData,
  ) {}

  /** Form config. */
  public form = this.fb.group({
    title: [this.data?.film?.title ?? '', Validators.required],
    director: [this.data?.film?.director ?? '', [Validators.required]],
    producer: [this.data?.film?.producer ?? '', [Validators.required]],
    openingCrawl: [this.data?.film?.openingCrawl ?? '', [Validators.required]],
    charactersIds: [this.data?.film?.charactersIds ?? '', [Validators.required]],
    planetsIds: [this.data?.film?.planetsIds ?? '', [Validators.required]],
    episodeId: [this.data?.film?.episodeId ?? '', [Validators.required]],
    releaseDate: [this.data?.film?.releaseDate ?? '', [Validators.required]],
  });

  /** Submit form function. */
  public submitForm(): void {
    this.dialogRef.close(this.form.value);
    if (!this.data) {
      this.filmsService.addFilm(this.form.value).pipe(
        first(),
      )
        .subscribe(() => this.router.navigate(['']));
    }
    if (this.data) {
      this.filmsService.updateFilm({ ...this.form.value, id: this.data.film?.id }).pipe(
        first(),
      )
        .subscribe(() => this.router.navigate(['']));
    }
  }
}
