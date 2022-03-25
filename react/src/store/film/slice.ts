import { createDraft } from 'immer';
import { createSlice } from '@reduxjs/toolkit';
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
        return {
          ...state,
          error: action.error.message,
        };
      }
      return state;
    })
    .addCase(fetchMoreFilms.fulfilled, (state, action) => ({
      ...state,
      films: state.films.concat(createDraft(action.payload.films)),
      lastDocCursor: action.payload.lastDocCursor,
    }))
    .addCase(fetchMoreFilms.rejected, (state, action) => {
      if (action.error.message) {
        return {
          ...state,
          error: action.error.message,
        };
      }
      return state;
    }),
});
