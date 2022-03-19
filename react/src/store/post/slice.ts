import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts } from './dispatchers';

import { initialState } from './state';

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchPosts.pending, state => {
      state.loading = true;
    })
    .addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    })
    .addCase(fetchPosts.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.loading = false;
    }),
});
