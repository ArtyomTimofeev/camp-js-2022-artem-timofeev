import { getAuth } from 'firebase/auth';
import { query, collection, getDocs, DocumentData, orderBy } from 'firebase/firestore';

import { FILMS_COLLECTION, TITLE_PROPERTY } from '../utils/constants';

import { db } from './firebase-config';

export const auth = getAuth();

/**
 * Gets film list from collection.
 * @param sortingType - Type of selected sort.
 */
export const getFilms = async(sortingType: string = TITLE_PROPERTY): Promise<DocumentData> => {
  const queryForFilms = query(collection(db, FILMS_COLLECTION), orderBy(sortingType, 'asc'));
  const filmsSnapshot = await getDocs(queryForFilms);
  return filmsSnapshot.docs.map(doc => ({
    ...doc.data(),
        id: doc.id,
  }));
};
