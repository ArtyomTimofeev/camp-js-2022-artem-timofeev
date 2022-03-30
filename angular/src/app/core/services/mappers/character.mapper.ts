import { Injectable } from '@angular/core';

import { Character } from '../../models/character';

import { CharacterDto } from './dto/character.dto';
import { IMapper } from './mappers';

/** Character mapper. */
@Injectable({
  providedIn: 'root',
})
export class CharacterMapper implements IMapper<CharacterDto, Character> {

  /**
   * From Dto to Model.
   * @param dto Character DTO.
   */
  public fromDto(dto: CharacterDto): Character {
    return {
      id: dto.pk,
      name: dto.fields.name,
    };
  }

  /**
   * From Model to Dto.
   * @param model Character model.
   */
  public toDto(model: Character): CharacterDto {
    return {
      fields: {
        name: model.name,
      },
      pk: model.id,
    };
  }
}
