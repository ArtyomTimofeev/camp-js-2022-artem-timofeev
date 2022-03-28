import { Planet } from '../../models/planet';
import { PlanetDto } from '../dtos/planet.dto';

/** Planet mapper. */
export class PlanetMapper {
  /**
   * From Dto to Model.
   * @param dto Planet DTO.
   */
  public fromDto(dto: PlanetDto): Planet {
    return {
      id: dto.pk,
      climate: dto.fields.climate,
      diameter: dto.fields.diameter,
      gravity: dto.fields.gravity,
      name: dto.fields.name,
      orbitalPeriod: Number(dto.fields.orbital_period),
      population: Number(dto.fields.population),
      rotationPeriod: Number(dto.fields.rotation_period),
      surfaceWater: Number(dto.fields.surface_water),
      terrain: dto.fields.terrain,
      created: new Date(dto.fields.created),
      edited: new Date(dto.fields.edited),
      model: dto.model,
      pk: dto.pk,
    };
  }
}

export const planetMapper = new PlanetMapper();
