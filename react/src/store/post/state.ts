import { Film } from '../../models/film';

/**
 * Films state.
 */
export interface FilmsState {
  /** Films list. */
  readonly films: Film[];

  /** Error. */
  readonly error?: string;

  /** Loading. */
  readonly loading: boolean;
}

export const initialState: FilmsState = {
  loading: false,
  films: [],
};
