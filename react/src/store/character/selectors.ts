import { createSelector } from '@reduxjs/toolkit';
import { charactersAdapter } from './state';

import { RootState } from '../store';

/** Selects selected film. */
export const selectFetchPlanetsError = createSelector(
  (state: RootState) => state.characters.error,
  error => error,
);

export const {
  /** Selects all films. */
  selectAll: selectCharacters,
} = charactersAdapter.getSelectors<RootState>(state => state.characters);
