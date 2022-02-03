import { getAuth } from 'firebase/auth';
import { query, collection, getDocs, orderBy } from 'firebase/firestore';

import { FILMS_COLLECTION } from '../utils/constants';
import { FilmsSortingType } from '../entities/enums/filmSortingTypeEnum';
import { filmMapper } from '../entities/mappers/filmMapper';
import { FilmDocumentDTO } from '../entities/DTOs/filmDTO';

import { Film } from './../entities/models/film';
import { db } from './firebase-config';

export const auth = getAuth();

/**
 * Gets film list from collection.
 * @param sortingType - Type of selected sort.
 */
export const getFilms = async(sortingType = FilmsSortingType.Default): Promise<Film[]> => {
  const queryForFilms = query(collection(db, FILMS_COLLECTION), orderBy(sortingType, 'asc'));
  const filmsSnapshot = await getDocs(queryForFilms);
  const filmDocuments = filmsSnapshot.docs.map(doc => doc.data() as FilmDocumentDTO);
  return filmDocuments.map(filmDocument => filmMapper.fromDto(filmDocument));
};
