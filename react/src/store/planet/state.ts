import { createEntityAdapter } from '@reduxjs/toolkit';
import { Planet } from 'src/models/planet';

export const planetsAdapter = createEntityAdapter<Planet>({
  selectId: planet => planet.id,
});

/**
 * Films state.
 */
interface PlanetsStateData {

  /** Error. */
  readonly error?: string;
}

export const initialState = planetsAdapter.getInitialState<PlanetsStateData>({});
