import { Film } from 'src/models/film';
import { createEntityAdapter } from '@reduxjs/toolkit';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore/lite';

export const filmsAdapter = createEntityAdapter<Film>({
  selectId: film => film.id,
});

/**
 * Films state.
 */
interface FilmsStateData {

  /** Error. */
  readonly error?: string;

  /** Last document cursor. */
  readonly lastDocCursor: QueryDocumentSnapshot<DocumentData> | null;

  /** Selected film. */
  readonly selectedFilm: Film | null;
}

export const initialState = filmsAdapter.getInitialState<FilmsStateData>({
  lastDocCursor: null,
  selectedFilm: null,
});

export type FilmsState = typeof initialState;
