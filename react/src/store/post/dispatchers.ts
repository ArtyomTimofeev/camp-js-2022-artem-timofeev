import { createAsyncThunk } from '@reduxjs/toolkit';
import { PostService } from 'src/api/services/post.service';

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  () => PostService.fetchPosts(),
);
