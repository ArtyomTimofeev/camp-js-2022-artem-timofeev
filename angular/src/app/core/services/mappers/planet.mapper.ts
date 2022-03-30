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
   * From Dto to Model.
   * @param dto Planet DTO.
   */
  public fromDto(dto: PlanetDto): Planet {
    return {
      id: dto.pk,
      name: dto.fields.name,
    };
  }

  /**
   * From Model to Dto.
   * @param model Model model.
   */
  public toDto(model: Planet): PlanetDto {
    return {
      fields: {
        name: model.name,
      },
      pk: model.id,
    };
  }
}
