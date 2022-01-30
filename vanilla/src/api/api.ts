import { getAuth } from 'firebase/auth';
import { query, collection, getDocs } from 'firebase/firestore';

import { FILMS } from '../utils/constants';

import { db } from './firebase-config';

export const auth = getAuth();

export const API = {
  /**
   * Gets film list from collection.
   */
  async getFilms(): Promise<any> {
    const queryForFilms = query(collection(db, FILMS));
    const filmsSnapshot = await getDocs(queryForFilms);
    const filmsList = filmsSnapshot.docs.map(doc => ({
      ...doc.data(),
          id: doc.id,
    }));
    return filmsList;
  },
};
