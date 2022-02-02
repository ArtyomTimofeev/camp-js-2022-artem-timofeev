import { Film, FilmDocument } from '../types/filmTypes';

export const filmMapper = {
  fromDto(dto: FilmDocument): Film {
    return {
      id: dto.pk,
      characterIds: dto.fields.characters,
      specieIds: dto.fields.species,
      starshipIds: dto.fields.starships,
      vehicleIds: dto.fields.vehicles,
      created: new Date(dto.fields.created).toLocaleDateString(),
      director: dto.fields.director,
      edited: new Date(dto.fields.edited).toLocaleDateString(),
      episodeId: dto.fields.episode_id,
      openingCrawl: dto.fields.opening_crawl,
      producer: dto.fields.producer,
      releaseDate: new Date(dto.fields.release_date).toLocaleDateString(),
      title: dto.fields.title,
      model: dto.model,
    };
  },
};
