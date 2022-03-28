import { createSelector } from '@reduxjs/toolkit';
import { planetsAdapter } from './state';

import { RootState } from '../store';

/** Selects selected film. */
export const selectFetchPlanetsError = createSelector(
  (state: RootState) => state.planets.error,
  error => error,
);

export const {
  /** Selects all films. */
  selectAll: selectPlanets,
} = planetsAdapter.getSelectors<RootState>(state => state.planets);
