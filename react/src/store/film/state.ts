import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore/lite';
import { Film } from '../../models/film';

/**
 * Films state.
 */
export interface FilmsState {
  /** Films list. */
  readonly films: Film[];

  /** Error. */
  readonly error?: string;

  /** Last document cursor. */
  readonly lastDocCursor: QueryDocumentSnapshot<DocumentData> | null;
}

export const initialState: FilmsState = {
  films: [],
  lastDocCursor: null,
};
