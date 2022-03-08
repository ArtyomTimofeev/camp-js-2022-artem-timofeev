
import { Injectable } from '@angular/core';
import { OrderByDirection } from '@angular/fire/firestore';
import { Sort } from '@angular/material/sort';

import { Film } from '../models/film';

import { FilmDto } from './dto/film.dto';
import { IMapperFromDto } from './mappers';

const DEFAULT_SORTING = null;

/** Firebase sorting config interface. */
export interface FirebaseSort {

  /** The field by which sorting occurs. */
  fieldPath: string;

  /** Sorting direction. */
  directionStr?: OrderByDirection;
}

/** Film mapper. */
@Injectable({
  providedIn: 'root',
})
export class FilmMapper implements IMapperFromDto<FilmDto, Film> {

  /** @inheritdoc */
  public querySortMap: Map<string, string> = new Map([
    ['releaseDate', 'release_date'],
    ['episodeId', 'episode_id'],
    ['title', 'title'],
    ['producer', 'producer'],
  ]);

  /** @inheritdoc */
  public fromDto(dto: FilmDto): Film {
    return {
      id: dto.id,
      characterIds: dto.fields.characters,
      planetsIds: dto.fields.planets,
      director: dto.fields.director,
      episodeId: dto.fields.episode_id,
      openingCrawl: dto.fields.opening_crawl,
      producer: dto.fields.producer,
      releaseDate: new Date(dto.fields.release_date),
      title: dto.fields.title,
    };
  }

  /** @inheritdoc */
  public toDto(model: Film): FilmDto {
    return {
      id: model.id,
      fields: {
        title: model.title,
        director: model.director,
        opening_crawl: model.openingCrawl,
        producer: model.producer,
        release_date: model.releaseDate.toISOString(),
        characters: model.characterIds,
        planets: model.planetsIds,
        episode_id: model.episodeId,
      },
    };
  }

  /** @inheritdoc */
  public toDtoSortConfig(sort: Sort): FirebaseSort | null {
    if (sort?.direction && this.querySortMap.has(sort.active)) {
      return {
        fieldPath: `fields.${this.querySortMap.get(sort.active)}`,
        directionStr: sort.direction,
      };
    }
    return DEFAULT_SORTING;
  }
}
