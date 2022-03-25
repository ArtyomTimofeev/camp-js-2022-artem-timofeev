import { createSlice } from '@reduxjs/toolkit';
import { castDraft } from 'immer';
import { fetchFilms, fetchMoreFilms } from './dispatchers';
import { initialState } from './state';

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchFilms.fulfilled, (state, action) => ({
      ...state,
      films: action.payload.films,
      lastDocCursor: action.payload.lastDocCursor,
    }))
    .addCase(fetchFilms.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
    })
    .addCase(fetchMoreFilms.fulfilled, (state, action) => ({
      ...state,
      films: state.films.concat(castDraft(action.payload.films)),
      lastDocCursor: action.payload.lastDocCursor,
    }))
    .addCase(fetchMoreFilms.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
    }),
});
