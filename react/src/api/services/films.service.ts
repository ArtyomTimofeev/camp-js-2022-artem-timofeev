import { Film } from 'src/models/film';
import {
  addDoc,
  collection, deleteDoc, doc, DocumentData, getDoc, getDocs, limit, orderBy,
  Query, query, QueryDocumentSnapshot, startAfter, updateDoc, where,
} from 'firebase/firestore/lite';

import {
  FILMS_COLLECTION_NAME, FIREBASE_SYMBOL_ENCODING, TITLE_PROPERTY,
} from '../../utils/constants';
import { FilmDto } from '../dtos/film.dto';
import { FirebaseService } from './firebase.service';
import { filmMapper } from '../mappers/film.mapper';

/**
 * FetchFilms function returned data.
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
      .map(filmDoc => ({ ...filmDoc.data(), id: filmDoc.id }))
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

  /**
   * Fetches film doc by id.
   * @param id - Film id.
   */
  export const fetchFilmById = async (id: Film['id']):
  Promise<Film> => {
    const docRef = doc(FirebaseService.db, FILMS_COLLECTION_NAME, id);
    const filmsSnapshot = await getDoc(docRef);
    const dto = { ...filmsSnapshot.data(), id: filmsSnapshot.id } as FilmDto;
    return filmMapper.fromDto(dto);
  };

  /**
   * Adds film doc to films collection.
   * @param film - Added film doc.
   */
  export const createFilm = async (film: Film): Promise<void> => {
    const filmDto = filmMapper.toDto(film);
    await addDoc(collection(FirebaseService.db, FILMS_COLLECTION_NAME), filmDto);
  };

  /**
   * Updates film doc in films collection.
   * @param film - Updated film doc.
   */
  export const updateFilm = async (film: Film): Promise<void> => {
    const filmDto = filmMapper.toDto(film);
    const bookDoc = doc(FirebaseService.db, FILMS_COLLECTION_NAME, film.id);
    await updateDoc(bookDoc, filmDto);
  };

  /**
   *  Deletes film doc from films collection.
   * @param id - Removable film id.
   */
  export const deleteFilm = async (id: Film['id']): Promise<void> => {
    const bookDoc = doc(FirebaseService.db, FILMS_COLLECTION_NAME, id);
    await deleteDoc(bookDoc);
  };
}
