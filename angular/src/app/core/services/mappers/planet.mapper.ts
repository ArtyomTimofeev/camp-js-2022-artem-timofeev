import { Injectable } from '@angular/core';

import { Planet } from '../../models/planet';

import { PlanetDto } from './dto/planet.dto';
import { IMapper } from './mappers';

/** Planet mapper. */
@Injectable({
  providedIn: 'root',
})
export class PlanetMapper implements IMapper<PlanetDto, Planet> {

  /**
   * Maps Planet DTO to Planet model.
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

  /**
   * Maps Planet model to Planet DTO.
   * @param model Model model.
   */
  public toDto(model: Planet): PlanetDto {
    return {
      fields: {
        climate: model.climate,
        diameter: model.diameter,
        gravity: model.gravity,
        name: model.name,
        orbital_period: String(model.orbitalPeriod),
        population: String(model.population),
        rotation_period: String(model.rotationPeriod),
        surface_water: String(model.surfaceWater),
        terrain: model.terrain,
        created: model.created.toISOString(),
        edited: model.edited.toISOString(),
      },
      model: model.model,
      pk: model.pk,
    };
  }
}
