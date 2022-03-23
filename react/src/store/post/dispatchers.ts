// @ts-nocheck
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilmsService } from 'src/api/services/films.service';

interface Payload {

  /** Sorting type. */
  readonly sortingType: string;

  /** Search value. */
  readonly searchValue: string;
}

export const fetchFilms = createAsyncThunk(
  'films/fetchFilms',
  (payload: Payload) => {
    const {
      sortingType, searchValue,
    } = payload;
    return (FilmsService.fetchFilms(sortingType, searchValue));
  },
);

export const fetchMoreFilms = createAsyncThunk(
  'films/fetchMoreFilms',
  () => (FilmsService.fetchMoreFilms()),
);
