import { Injectable } from '@angular/core';
import { OrderByDirection } from '@angular/fire/firestore';

import { Film } from '../../models/film';
import { SortConfig } from '../../models/table-config';

import { IMapper } from './mappers';
import { FilmCreateDto, FilmDto } from './dto/film.dto';

type SortFieldsNames = keyof Pick<Film, 'releaseDate' | 'episodeId' | 'title' | 'producer'>;
type SortFieldsNamesDto = keyof Pick<FilmDto['fields'], 'release_date' | 'episode_id' | 'title' | 'producer'>;

/** Firebase sorting config interface. */
interface FirebaseSortQuery {

  /** The field by which sorting occurs. */
  readonly activeField: string;

  /** Sorting direction.
   */
  readonly direction: OrderByDirection | '';
}

/** Film mapper. */
@Injectable({
  providedIn: 'root',
})
export class FilmMapper implements IMapper<FilmCreateDto, Film> {

  /**
   * From Dto to Model.
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

  /**
   * From Model to Dto.
   * @param model - Model.
   */
  public toDto(model: Film): FilmCreateDto {
    return {
      fields: {
        title: model.title,
        director: model.director,
        opening_crawl: model.openingCrawl,
        producer: model.producer,
        release_date: model.releaseDate.toISOString(),
        characters: model.charactersIds,
        planets: model.planetsIds,
        episode_id: model.episodeId,
      },
    };
  }

  /**
   * From Model SortConfig to Dto Sort query.
   * @param sortConfig - Sorting config.
   */
  public toDtoSortConfig(sortConfig: SortConfig): FirebaseSortQuery {
    const sortField = sortConfig.active as SortFieldsNames;
    return {
      activeField: `fields.${this.sortFieldsNamesDto[sortField]}`,
      direction: sortConfig.direction ?? 'asc',
    };
  }

  private readonly sortFieldsNamesDto: Record<SortFieldsNames, SortFieldsNamesDto> = {
    releaseDate: 'release_date',
    episodeId: 'episode_id',
    title: 'title',
    producer: 'producer',
  };
}
