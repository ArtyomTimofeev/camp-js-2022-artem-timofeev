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
      name: dto.fields.name,
    };
  }
}

export const planetMapper = new PlanetMapper();
