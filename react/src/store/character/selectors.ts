import { createSelector } from '@reduxjs/toolkit';
import { charactersAdapter } from './state';

import { RootState } from '../store';

/** Selects error. */
export const selectCharacterFetchError = createSelector(
  (state: RootState) => state.characters.error,
  error => error,
);

/** Selects all  characters . */
export const selectAll = createSelector(
  (state: RootState) => state.characters.allCharacters,
  allCharacters => allCharacters,
);

export const {
  /** Selects related characters. */
  selectAll: selectCharacters,
} = charactersAdapter.getSelectors<RootState>(state => state.characters);
