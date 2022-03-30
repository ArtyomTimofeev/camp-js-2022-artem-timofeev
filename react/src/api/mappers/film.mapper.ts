import { Film } from 'src/models/film';
import { FilmCreateDto, FilmDto } from '../dtos/film.dto';

/** Film mapper. */
class FilmMapper {
  /** @inheritdoc */
  public fromDto(dto: FilmDto): Film {
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
}

export const filmMapper = new FilmMapper();
