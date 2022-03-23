import { createSlice } from '@reduxjs/toolkit';
import { fetchFilms, fetchMoreFilms } from './dispatchers';
import { initialState } from './state';

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchFilms.pending, state => {
      state.loading = true;
    })
    .addCase(fetchFilms.fulfilled, (state, action) => {
      state.films = action.payload;
      state.loading = false;
    })
    .addCase(fetchFilms.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.loading = false;
    })
    .addCase(fetchMoreFilms.pending, state => {
      state.loading = true;
    })
    .addCase(fetchMoreFilms.fulfilled, (state, action) => {
      state.films = action.payload;
    })
    .addCase(fetchMoreFilms.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.loading = false;
    }),
});
