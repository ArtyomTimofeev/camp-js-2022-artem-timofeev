
import { Injectable } from '@angular/core';
import { OrderByDirection } from '@angular/fire/firestore';
import { Sort } from '@angular/material/sort';

import { Film } from '../../models/film';

import { IMapper } from './mappers';

import { FilmCreateDto, FilmDto } from './dto/film.dto';

/** Firebase sorting config interface. */
interface FirebaseSortQuery {

  /** The field by which sorting occurs. */
  activeField: string;

  /** Sorting direction. */
  direction: OrderByDirection | '';
}

/** Film mapper. */
@Injectable({
  providedIn: 'root',
})
export class FilmMapper implements IMapper<FilmCreateDto, Film> {

  /** From sort config to sort query. */
  public querySortMap: Map<keyof Film, keyof FilmDto['fields']> = new Map([
    ['releaseDate', 'release_date'],
    ['episodeId', 'episode_id'],
    ['title', 'title'],
    ['producer', 'producer'],
  ]);

  /** From Dto to Model.
   * @param dto - Dto.
   */
  public fromDto(dto: FilmDto): Film {
    return {
      id: dto.id,
      charactersIds: dto.fields.characters,
      planetsIds: dto.fields.planets,
      director: dto.fields.director,
      episodeId: dto.fields.episode_id,
      openingCrawl: dto.fields.opening_crawl,
      producer: dto.fields.producer,
      releaseDate: new Date(dto.fields.release_date),
      title: dto.fields.title,
    };
  }

  /** From Model to Dto.
   * @param model - Model.
   */
  public toDto(model: Film): FilmCreateDto {
    return {
      fields: {
        title: model.title,
        director: model.director,
        opening_crawl: model.openingCrawl,
        producer: model.producer,
        release_date: String(model.releaseDate),
        characters: model.charactersIds,
        planets: model.planetsIds,
        episode_id: model.episodeId,
      },
    };
  }

  /** From Model SortConfig to Dto Sort query.
   * @param sortConfig - Sorting config.
   */
  public toDtoSortConfig(sortConfig: Sort): FirebaseSortQuery | null {
    const sortFiled = sortConfig.active as keyof Film;
    return {
      activeField: `fields.${this.querySortMap.get(sortFiled)}`,
      direction: sortConfig.direction ?? 'asc',
    };
  }
}
