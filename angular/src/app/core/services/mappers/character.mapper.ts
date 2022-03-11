import { Injectable } from '@angular/core';

import { Character } from '../../models/character';

import { CharacterDto } from './dto/character.dto';

/** Character mapper. */
@Injectable({
  providedIn: 'root',
})
export class CharacterMapper {

  /**
   * Maps Character DTO to Character model.
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
   * Maps Character model to Character DTO.
   * @param character Character model.
   */
  public toDto(character: Character): CharacterDto {
    return {
      fields: {
        birth_year: character.birthYear,
        eye_color: character.eyeColor.join(','),
        gender: character.gender,
        hair_color: character.hairColor.join(','),
        height: String(character.height),
        mass: String(character.mass),
        name: character.name,
        homeworld: character.homeworld,
        skin_color: character.skinColor.join(','),
        created: character.created.toISOString(),
        edited: character.edited.toISOString(),
      },
      model: character.model,
      pk: character.pk,
    };
  }
}
