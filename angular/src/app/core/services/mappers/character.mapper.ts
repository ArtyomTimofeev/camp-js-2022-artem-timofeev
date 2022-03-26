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

  /**
   * From Model to Dto.
   * @param model Character model.
   */
  public toDto(model: Character): CharacterDto {
    return {
      fields: {
        birth_year: model.birthYear,
        eye_color: model.eyeColor.join(','),
        gender: model.gender,
        hair_color: model.hairColor.join(','),
        height: String(model.height),
        mass: String(model.mass),
        name: model.name,
        homeworld: model.homeworld,
        skin_color: model.skinColor.join(','),
        created: model.created.toISOString(),
        edited: model.edited.toISOString(),
      },
      model: model.model,
      pk: model.pk,
    };
  }
}
