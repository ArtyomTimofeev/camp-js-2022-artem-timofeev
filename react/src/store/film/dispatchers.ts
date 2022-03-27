import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilmsService } from 'src/api/services/films.service';
import { FilmsState } from './state';

interface FetchFilmsOptions {

  /** Sorting type. */
  readonly sortingType: string;

  /** Search value. */
  readonly searchValue: string;
}

interface FetchMoreFilmsOptions {

  /** Sorting type. */
  readonly sortingType: string;

  /** Last document cursor. */
  readonly lastDocCursor: FilmsState['lastDocCursor'];
}

export const fetchFilms = createAsyncThunk(
  'films/fetchFilms',
  ({ sortingType, searchValue }: FetchFilmsOptions) => FilmsService.fetchFilms(sortingType, searchValue),
);

export const fetchMoreFilms = createAsyncThunk(
  'films/fetchMoreFilms',
  ({ sortingType, lastDocCursor }: FetchMoreFilmsOptions) => FilmsService.fetchMoreFilms(sortingType, lastDocCursor),
);
