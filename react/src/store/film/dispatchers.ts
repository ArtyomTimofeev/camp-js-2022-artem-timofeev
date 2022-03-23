import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilmsService } from 'src/api/services/films.service';
import { FilmsState } from './state';

interface FetchFilmsProps {

  /** Sorting type. */
  readonly sortingType: string;

  /** Search value. */
  readonly searchValue: string;
}

interface FetchMoreFilmsProps {

  /** Sorting type. */
  readonly sortingType: string;

  /** Last document cursor. */
  readonly lastDocCursor: FilmsState['lastDocCursor'];
}

export const fetchFilms = createAsyncThunk(
  'films/fetchFilms',
  (fetchFilmsProps: FetchFilmsProps) => {
    const {
      sortingType, searchValue,
    } = fetchFilmsProps;
    return FilmsService.fetchFilms(sortingType, searchValue);
  },
);

export const fetchMoreFilms = createAsyncThunk(
  'films/fetchMoreFilms',
  (fetchMoreFilmsProps: FetchMoreFilmsProps) => {
    const { sortingType, lastDocCursor } = fetchMoreFilmsProps;
    return FilmsService.fetchMoreFilms(sortingType, lastDocCursor);
  },
);
