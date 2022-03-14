import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Film } from 'src/app/core/models/film';
import { Observable } from 'rxjs';
import { PlanetMapper } from 'src/app/core/services/mappers/planet.mapper';
import { CharacterMapper } from 'src/app/core/services/mappers/character.mapper';
import { Planet } from 'src/app/core/models/planet';
import { CHARACTERS_COLLECTION, PLANETS_COLLECTION } from 'src/app/core/utils/constants';
import { MatDialog } from '@angular/material/dialog';

import { DialogWithFilmFormComponent } from 'src/app/shared/components/dialog-with-film-form/dialog-with-film-form.component';

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

  public selectedFilm$: Observable<Film> = this.filmsService.getFilmById(this.getSelectedFilmId());

  public planets$!: Observable<Planet[]>;

  public characters$!: Observable<Character[]>;

  public constructor(
    private readonly filmsService: FilmsService,
    private readonly additionalCollectionsService: AdditionalCollectionsService,
    private readonly planetMapper: PlanetMapper,
    private readonly characterMapper: CharacterMapper,
    private readonly router: Router,
    private readonly dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    this.selectedFilm$.subscribe(filmData => {
      const { planetsIds, characterIds } = filmData;
      this.planets$ = this.additionalCollectionsService
        .getCollectionItems<PlanetDto, Planet>(planetsIds, this.planetMapper, PLANETS_COLLECTION);
      this.characters$ = this.additionalCollectionsService
        .getCollectionItems<CharacterDto, Character>(characterIds, this.characterMapper, CHARACTERS_COLLECTION);
    });
  }

  private getSelectedFilmId(): string {
    const params = new URLSearchParams(window.location.search);
    return String(params.get('id'));
  }

  public async deleteFilm(id: string): Promise<void> {
    try {
      await this.filmsService.deleteFilm(id);
      this.router.navigate(['']);
    } catch (error) {
      console.error(error);
    }
  }

  public editFilm() {
    this.dialog.open(DialogWithFilmFormComponent);
  }
}
