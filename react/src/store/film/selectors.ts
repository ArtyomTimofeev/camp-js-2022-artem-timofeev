import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { filmsAdapter } from './state';

/** Selects films loading state. */
export const selectLastDocCursor = createSelector(
  (state: RootState) => state.films.lastDocCursor,
  lastDocCursor => lastDocCursor,
);

export const {
  /** Selects all films. */
  selectAll: selectFilms,
} = filmsAdapter.getSelectors<RootState>(state => state.films);
