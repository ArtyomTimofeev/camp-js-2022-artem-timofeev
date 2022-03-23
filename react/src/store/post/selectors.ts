import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects all films from store. */
export const selectFilms = createSelector((state: RootState) => state.films.films, film => film);

/** Selects films loading state. */
export const selectIsFilmsLoading = createSelector((state: RootState) => state.films.loading, loading => loading);
