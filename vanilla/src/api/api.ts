import { getAuth } from 'firebase/auth';
import { query, collection, getDocs, orderBy } from 'firebase/firestore';

import { FilmsSortingType } from '../entities/enums/filmSortingTypeEnum';
import { filmMapper } from '../entities/mappers/filmMapper';
import { Film, FilmDocument } from '../entities/types/filmTypes';
import { FILMS_COLLECTION } from '../utils/constants';

import { db } from './firebase-config';

export const auth = getAuth();

/**
 * Gets film list from collection.
 * @param sortingType - Type of selected sort.
 */
export const getFilms = async(sortingType = FilmsSortingType.Default): Promise<Film[]> => {
  const queryForFilms = query(collection(db, FILMS_COLLECTION), orderBy(sortingType, 'asc'));
  const filmsSnapshot = await getDocs(queryForFilms);
  const filmsDocument = filmsSnapshot.docs.map(doc => doc.data() as FilmDocument);
  return filmsDocument.map(filmDocument => filmMapper.fromDto(filmDocument));
};
