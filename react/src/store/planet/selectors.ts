import { planetsAdapter } from './state';

import { RootState } from '../store';

export const {
  /** Selects all planets. */
  selectAll: selectPlanets,
} = planetsAdapter.getSelectors<RootState>(state => state.planets);
