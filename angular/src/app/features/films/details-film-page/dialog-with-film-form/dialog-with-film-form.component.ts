import { first, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { Component, ChangeDetectionStrategy, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FilmsService } from 'src/app/core/services/films.service';

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
export class DialogWithFilmFormComponent implements OnDestroy {
  /** All planets in the database. */
  public allPlanets$ = this.additionalCollectionsService.getAllPlanets();

  /** All characters in the database. */
  public allCharacters$ = this.additionalCollectionsService.getAllCharacters();

  private readonly onDestroy$ = new Subject<void>();

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly filmsService: FilmsService,
    private readonly additionalCollectionsService: AdditionalCollectionsService,
    private readonly dialogRef: MatDialogRef<DialogWithFilmFormComponent, Film>,
    private readonly router: Router,
    @Inject(MAT_DIALOG_DATA) private readonly data: DialogWithFilmFormData,
  ) {}

  /**  @inheritdoc */
  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  /** Form config. */
  public form = this.formBuilder.group({
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
  public onSubmitForm(): void {
    this.dialogRef.close(this.form.value);
    if (this.data === null) {
      this.filmsService.addFilm(this.form.value).pipe(
        first(),
        takeUntil(this.onDestroy$),
      )
        .subscribe(() => this.router.navigate(['']));
    }
    if (this.data) {
      this.filmsService.updateFilm({ ...this.form.value, id: this.data.film?.id }).pipe(
        first(),
        takeUntil(this.onDestroy$),
      )
        .subscribe(() => this.router.navigate(['']));
    }
  }
}
