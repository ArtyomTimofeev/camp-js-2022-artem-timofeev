import { createEntityAdapter } from '@reduxjs/toolkit';
import { Character } from '../../models/character';

export const charactersAdapter = createEntityAdapter<Character>({
  selectId: character => character.id,
});

/**
 * Films state.
 */
interface CharactersState {

  /** Error. */
  readonly error?: string;
}

export const initialState = charactersAdapter.getInitialState<CharactersState>({});
