import { query, collection, getDocs } from 'firebase/firestore';

import { db } from './firebase-config';

export const API = {
  async getFilms(): Promise<any> {
    const queryForFilms = query(collection(db, 'films'));
    const filmsSnapshot = await getDocs(queryForFilms);
    const filmsList = filmsSnapshot.docs.map(doc => ({
      ...doc.data(),
          id: doc.id,
    }));
    return filmsList;
  },
};
