import { Post } from 'src/models/post';

/**
 * Posts state.
 */
export interface PostsState {
  /** Posts list. */
  readonly posts: Post[];

  /** Error. */
  readonly error?: string;

  /** Loading. */
  readonly loading: boolean;
}

export const initialState: PostsState = {
  loading: false,
  posts: [],
};
