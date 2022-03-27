import { Film } from 'src/models/film';
import {
  collection, DocumentData, getDocs, limit, orderBy, Query, query, QueryDocumentSnapshot, startAfter, where,
} from 'firebase/firestore/lite';
import {
  FILMS_COLLECTION_NAME, FIREBASE_SYMBOL_ENCODING, TITLE_PROPERTY,
} from '../../utils/constants';
import { FilmDto } from '../dtos/film.dto';
import { FirebaseService } from './firebase.service';
import { filmMapper } from '../mappers/film.mapper';

/**
 * Films Service returned data.
 */
interface FetchFilmsReturnedData {

  /** Films list. */
  readonly films: readonly Film[];

  /** Last document cursor. */
  readonly lastDocCursor: QueryDocumentSnapshot<DocumentData> | null;
}

export namespace FilmsService {

  /** Limit for getting films query. */
  const FILMS_DOCS_LIMIT = 7;

  /**
   * Gets films List.
   * @param queryForFilms - Query for getting films.
   */
  const getFilmsList = async (queryForFilms: Query): Promise<FetchFilmsReturnedData> => {
    const filmsSnapshot = await getDocs(queryForFilms);
    let lastDocCursor = null;
    if (filmsSnapshot.docs.length > 0) {
      lastDocCursor = filmsSnapshot.docs[filmsSnapshot.docs.length - 1];
    }
    const films = filmsSnapshot.docs
      .map(doc => ({ ...doc.data(), id: doc.id }))
      .map(dto => filmMapper.fromDto(dto as FilmDto));
    return { lastDocCursor, films };
  };

  /**
   * Fetches films.
   * @param sortingType - Type of sorting.
   * @param searchValue - Search Value.
   */
  export const fetchFilms = (
    sortingType: string,
    searchValue: string,
  ): Promise<FetchFilmsReturnedData> => {
    const getQueryForFilms = (): Query => {
      if (searchValue !== '') {
        return query(
          collection(FirebaseService.db, FILMS_COLLECTION_NAME),
          where(TITLE_PROPERTY, '>=', searchValue),
          where(TITLE_PROPERTY, '<=', `${searchValue}${FIREBASE_SYMBOL_ENCODING}`),
          orderBy(TITLE_PROPERTY),
        );
      }
      return query(
        collection(FirebaseService.db, FILMS_COLLECTION_NAME),
        orderBy(sortingType),
        limit(FILMS_DOCS_LIMIT),
      );
    };
    const queryForFilms = getQueryForFilms();
    return getFilmsList(queryForFilms);
  };

  /**
   * Fetches next films chunk.
   * @param sortingType - Type of sorting.
   * @param currentLastDocCursor - Last Document cursor.
   */
  export const fetchMoreFilms = (
    sortingType: string,
    currentLastDocCursor: QueryDocumentSnapshot<DocumentData> | null,
  ): Promise<FetchFilmsReturnedData> => {
    const queryForFilms = query(
      collection(FirebaseService.db, FILMS_COLLECTION_NAME),
      orderBy(sortingType),
      limit(FILMS_DOCS_LIMIT),
      startAfter(currentLastDocCursor),
    );
    return getFilmsList(queryForFilms);
  };

}
