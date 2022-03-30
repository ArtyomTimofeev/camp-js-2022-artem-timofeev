import { Character } from '../../models/character';
import { CharacterDto } from '../dtos/character.dto';

/** Character mapper. */
export class CharacterMapper {
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
}

export const characterMapper = new CharacterMapper();
