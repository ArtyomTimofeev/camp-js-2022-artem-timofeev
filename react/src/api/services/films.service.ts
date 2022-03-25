import { Film } from 'src/models/film';
import {
  collection, DocumentData, getDocs, limit, orderBy, query, QueryDocumentSnapshot, startAfter, where,
} from 'firebase/firestore/lite';
import {
  FILMS_COLLECTION_NAME, FILMS_DOCS_LIMIT, FIREBASE_SYMBOL_ENCODING, TITLE_PROPERTY,
} from '../../utils/constants';
import { FilmDto } from '../dtos/film.dto';
import { FilmMapper } from '../mappers/film.mapper';
import { FirebaseService } from './firebase.service';

/**
 * Films Service returned data.
 */
interface FetchFilmsReturnedData {

  /** Films list. */
  readonly films: Film[];

  /** Last document cursor. */
  readonly lastDocCursor: QueryDocumentSnapshot<DocumentData>;
}

export namespace FilmsService {

  /**
   * Fetches films.
   * @param sortingType - Type of sorting.
   * @param searchValue - Search Value.
   */
  export async function fetchFilms(
    sortingType: string,
    searchValue: string,
  ): Promise<FetchFilmsReturnedData> {
    let queryForFilms = query(
      collection(FirebaseService.db, FILMS_COLLECTION_NAME),
      orderBy(sortingType),
      limit(FILMS_DOCS_LIMIT),
    );
    if (searchValue !== '') {
      queryForFilms = query(
        collection(FirebaseService.db, FILMS_COLLECTION_NAME),
        where(TITLE_PROPERTY, '>=', searchValue),
        where(TITLE_PROPERTY, '<=', `${searchValue}${FIREBASE_SYMBOL_ENCODING}`),
        orderBy(TITLE_PROPERTY),
      );
    }
    const filmsSnapshot = await getDocs(queryForFilms);
    const lastDocCursor = filmsSnapshot.docs[filmsSnapshot.docs.length - 1];
    const films = filmsSnapshot.docs
      .map(doc => ({ ...doc.data() as FilmDto, id: doc.id }))
      .map(dto => FilmMapper.fromDto(dto));
    return { lastDocCursor, films };
  }

  /**
   * Fetches next films chunk.
   * @param sortingType - Type of sorting.
   * @param currentLastDocCursor - Last Document cursor.
   */
  export async function fetchMoreFilms(
    sortingType: string,
    currentLastDocCursor: QueryDocumentSnapshot<DocumentData> | null,
  ): Promise<FetchFilmsReturnedData> {
    const queryForFilms = query(
      collection(FirebaseService.db, FILMS_COLLECTION_NAME),
      orderBy(sortingType),
      limit(FILMS_DOCS_LIMIT),
      startAfter(currentLastDocCursor),
    );
    const filmsSnapshot = await getDocs(queryForFilms);
    const lastDocCursor = filmsSnapshot.docs[filmsSnapshot.docs.length - 1];
    const films = filmsSnapshot.docs
      .map(doc => ({ ...doc.data(), id: doc.id }))
      .map(dto => FilmMapper.fromDto(dto as FilmDto));
    return { lastDocCursor, films };
  }

}
