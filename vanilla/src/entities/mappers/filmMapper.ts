import { FilmDocumentDTO } from '../DTOs/filmDTO';
import { Film } from '../models/film';

/**
 * MapperFromDto interface.
 */
export interface IMapperFromDto<TDto, TModel> {

  /** From Dto to Model.  */
  fromDto: (dto: TDto) => TModel;
}

export const filmMapper: IMapperFromDto<FilmDocumentDTO, Film> = {
  fromDto(dto: FilmDocumentDTO): Film {
    return {
      id: dto.pk,
      characterIds: dto.fields.characters,
      specieIds: dto.fields.species,
      starshipIds: dto.fields.starships,
      vehicleIds: dto.fields.vehicles,
      planetsIds: dto.fields.planets,
      created: new Date(dto.fields.created),
      director: dto.fields.director,
      edited: new Date(dto.fields.edited),
      episodeId: dto.fields.episode_id,
      openingCrawl: dto.fields.opening_crawl,
      producer: dto.fields.producer,
      releaseDate: new Date(dto.fields.release_date),
      title: dto.fields.title,
      model: dto.model,
    };
  },
};
