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
  (fetchFilmsOptions: FetchFilmsOptions) => {
    const {
      sortingType, searchValue,
    } = fetchFilmsOptions;
    return FilmsService.fetchFilms(sortingType, searchValue);
  },
);

export const fetchMoreFilms = createAsyncThunk(
  'films/fetchMoreFilms',
  (fetchMoreFilmsOptions: FetchMoreFilmsOptions) => {
    const { sortingType, lastDocCursor } = fetchMoreFilmsOptions;
    return FilmsService.fetchMoreFilms(sortingType, lastDocCursor);
  },
);
