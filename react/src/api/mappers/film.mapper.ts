import { Film } from 'src/models/film';
import { FilmDto } from '../dtos/film.dto';

export namespace FilmMapper {
  /**
   * From Dto to Model.
   * @param dto - Dto.
   */
  export function fromDto(dto: FilmDto): Film {
    return new Film({
      id: dto.id,
      charactersIds: dto.fields.characters,
      planetsIds: dto.fields.planets,
      director: dto.fields.director,
      episodeId: dto.fields.episode_id,
      openingCrawl: dto.fields.opening_crawl,
      producer: dto.fields.producer,
      releaseDate: new Date(dto.fields.release_date),
      title: dto.fields.title,
    });
  }
}
