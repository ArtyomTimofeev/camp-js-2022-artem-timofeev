import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { _closeDialogVia, MatDialog } from '@angular/material/dialog';
import { FilmsService } from 'src/app/core/services/films.service';
import { CHARACTERS_COLLECTION, FILMS_COLLECTION, PLANETS_COLLECTION } from 'src/app/core/utils/constants';

import { FilmMapper } from './../../../core/services/mappers/film.mapper';
import { CharacterMapper } from './../../../core/services/mappers/character.mapper';
import { PlanetMapper } from './../../../core/services/mappers/planet.mapper';
import { AdditionalCollectionsService } from './../../../core/services/additional-collections.service';

@Component({
  selector: 'sw-dialog-with-film-form',
  templateUrl: './dialog-with-film-form.component.html',
  styleUrls: ['./dialog-with-film-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogWithFilmFormComponent {

  public planets$ = this.additionalCollectionsService.getAllCollectionItems(PLANETS_COLLECTION, this.planetMapper);

  public characters$ = this.additionalCollectionsService.getAllCollectionItems(CHARACTERS_COLLECTION, this.characterMapper);

  public films$ = this.additionalCollectionsService.getAllCollectionItems(FILMS_COLLECTION, this.filmMapper);

  public constructor(
    private readonly fb: FormBuilder,
    private readonly filmsService: FilmsService,
    private readonly additionalCollectionsService: AdditionalCollectionsService,
    private readonly planetMapper: PlanetMapper,
    private readonly characterMapper: CharacterMapper,
    private readonly filmMapper: FilmMapper,
    private readonly router: Router,
    private readonly dialog: MatDialog,
  ) {}

  public form = this.fb.group({
    title: ['', Validators.required],
    director: ['', [Validators.required, Validators.max(100)]],
    producer: ['', [Validators.required, Validators.max(100)]],
    openingCrawl: ['', [Validators.required, Validators.max(100)]],
    characterIds: ['', [Validators.required]],
    planetsIds: ['', [Validators.required]],
    episodeId: ['', [Validators.required]],
    releaseDate: ['', [Validators.required]],
  });

  public async submitForm(): Promise<void> {
    await this.filmsService.addFilm(this.form.value);
    this.dialog.closeAll();
    this.router.navigate(['']);
  }
}
