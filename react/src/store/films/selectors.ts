import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { filmsAdapter } from './state';

/** Selects films loading state. */
export const selectLastDocCursor = createSelector(
  (state: RootState) => state.films.lastDocCursor,
  lastDocCursor => lastDocCursor,
);

/** Selects selected film. */
export const selectSelectedFilm = createSelector(
  (state: RootState) => state.films.selectedFilm,
  selectedFilm => selectedFilm,
);

/** Selects selected film. */
export const selectFetchFilmsError = createSelector(
  (state: RootState) => state.films.error,
  error => error,
);

export const {
  /** Selects all films. */
  selectAll: selectFilms,
} = filmsAdapter.getSelectors<RootState>(state => state.films);
