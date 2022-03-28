import { createSlice } from '@reduxjs/toolkit';
import { fetchRelatedCharacters } from './dispatchers';
import { initialState, charactersAdapter } from './state';

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchRelatedCharacters.fulfilled, (state, { payload }) => {
      charactersAdapter.setAll(state, payload);
    })
    .addCase(fetchRelatedCharacters.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
    }),
});
