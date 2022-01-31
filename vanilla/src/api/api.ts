import { getAuth } from 'firebase/auth';
import { query, collection, getDocs, DocumentData } from 'firebase/firestore';

import { FILMS_COLLECTION } from '../utils/constants';

import { db } from './firebase-config';

export const auth = getAuth();

/**
 * Gets film list from collection.
 */
export const getFilms = async(): Promise<DocumentData> => {
  const queryForFilms = query(collection(db, FILMS_COLLECTION));
  const filmsSnapshot = await getDocs(queryForFilms);
  return filmsSnapshot.docs.map(doc => ({
    ...doc.data(),
        id: doc.id,
  }));
};
