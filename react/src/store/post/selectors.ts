import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects all posts from store. */
export const selectPosts = createSelector((state: RootState) => state.posts.posts, post => post);

/** Selects posts loading state. */
export const selectIsPostsLoading = createSelector((state: RootState) => state.posts.loading, loading => loading);
