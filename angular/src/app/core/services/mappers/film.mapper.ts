import { Injectable } from '@angular/core';

import { Film } from '../models/film';

import { FilmDto } from './dto/film.dto';
import { IMapperFromDto } from './mappers';

/** Film mapper. */
@Injectable({
  providedIn: 'root',
})
export class FilmMapper implements IMapperFromDto<FilmDto, Film> {

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
}
