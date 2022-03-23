import {
  collection, getDocs, orderBy, query, where,
} from 'firebase/firestore/lite';
import { Film } from 'src/models/film';
import { FILMS_COLLECTION_NAME, FIREBASE_SYMBOL_ENCODING, TITLE_PROPERTY } from '../../utils/constants';
import { FilmDto } from '../dtos/film.dto';
import { FilmMapper } from '../mappers/film.mapper';
import { FirebaseService } from './firebase.service';

export namespace FilmsService {

  /**
   * Fetches films.
   * @param sortingType - Type of sorting.
   * @param searchValue - Search Value.
   */
  export async function fetchFilms(sortingType: string, searchValue: string): Promise<Film[]> {
    let queryForFilms = query(collection(FirebaseService.db, FILMS_COLLECTION_NAME), orderBy(sortingType));
    if (searchValue !== '') {
      queryForFilms = query(
        collection(FirebaseService.db, FILMS_COLLECTION_NAME),
        where(TITLE_PROPERTY, '>=', searchValue),
        where(TITLE_PROPERTY, '<=', `${searchValue}${FIREBASE_SYMBOL_ENCODING}`),
        orderBy(TITLE_PROPERTY),
      );
    }
    const filmsSnapshot = await getDocs(queryForFilms);
    return filmsSnapshot.docs
      .map(doc => ({ ...doc.data(), id: doc.id }))
      .map(dto => FilmMapper.fromDto(dto as FilmDto));
  }
}
