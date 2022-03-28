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
      birthYear: dto.fields.birth_year,
      eyeColor: dto.fields.eye_color.split(','),
      gender: dto.fields.gender,
      hairColor: dto.fields.hair_color.split(','),
      height: Number(dto.fields.height),
      mass: Number(dto.fields.mass),
      name: dto.fields.name,
      homeworld: dto.fields.homeworld,
      skinColor: dto.fields.skin_color.split(','),
      created: new Date(dto.fields.created),
      edited: new Date(dto.fields.edited),
      model: dto.model,
      pk: dto.pk,
    };
  }
}

export const characterMapper = new CharacterMapper();
