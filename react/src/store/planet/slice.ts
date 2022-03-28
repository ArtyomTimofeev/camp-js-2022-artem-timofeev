import { createSlice } from '@reduxjs/toolkit';
import { fetchRelatedPlanets } from './dispatchers';
import { initialState, planetsAdapter } from './state';

export const planetsSlice = createSlice({
  name: 'planets',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchRelatedPlanets.fulfilled, (state, { payload }) => {
      planetsAdapter.setAll(state, payload);
    })
    .addCase(fetchRelatedPlanets.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
    }),
});
