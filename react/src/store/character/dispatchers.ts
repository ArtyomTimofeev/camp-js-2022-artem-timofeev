import { createAsyncThunk } from '@reduxjs/toolkit';
import { CharacterService } from 'src/api/services/character.service';
import { Film } from '../../models/film';

export const fetchRelatedCharacters = createAsyncThunk(
  'characters/fetchRelatedCharacters',
  (charactersIds: Film['charactersIds']) => CharacterService.fetchRelatedCharacters(charactersIds),
);

export const fetchAllCharacters = createAsyncThunk(
  'characters/fetchAllCharactersNames',
  () => CharacterService.fetchAllCharacters(),
);
