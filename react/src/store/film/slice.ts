import { createSlice } from '@reduxjs/toolkit';
import { fetchFilms, fetchMoreFilms } from './dispatchers';
import { filmsAdapter, FilmsState, initialState } from './state';

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchFilms.fulfilled, (state, { payload }) => {
      filmsAdapter.setAll(state as FilmsState, payload.films);
      state.lastDocCursor = payload.lastDocCursor;
    })
    .addCase(fetchFilms.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
    })
    .addCase(fetchMoreFilms.fulfilled, (state, { payload }) => {
      filmsAdapter.addMany(state as FilmsState, payload.films);
      state.lastDocCursor = payload.lastDocCursor;
    })
    .addCase(fetchMoreFilms.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
    }),
});
