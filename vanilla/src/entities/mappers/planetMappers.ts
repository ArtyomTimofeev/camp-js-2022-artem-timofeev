import { Planet } from './../models/planet';
import { PlanetDto } from './../DTOs/planetDTO';

export namespace planetMappers {

  /**
   * Maps Planet DTO to Planet model.
   * @param dto Planet DTO.
   */
  export function fromDto(dto: PlanetDto): Planet {
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
   * @param planet Planet model.
   */
  export function toDto(planet: Planet): PlanetDto {
    return {
      fields: {
        climate: planet.climate,
        diameter: planet.diameter,
        gravity: planet.gravity,
        name: planet.name,
        orbital_period: String(planet.orbitalPeriod),
        population: String(planet.population),
        rotation_period: String(planet.rotationPeriod),
        surface_water: String(planet.surfaceWater),
        terrain: planet.terrain,
        created: planet.created.toISOString(),
        edited: planet.edited.toISOString(),
      },
      model: planet.model,
      pk: planet.pk,
    };
  }
}
