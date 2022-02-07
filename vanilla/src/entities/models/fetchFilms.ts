import { DocumentData, Query, QueryDocumentSnapshot } from 'firebase/firestore';

import { Film } from './film';

/**
 * FetchFilms model.
 */
export interface FetchFilms {

  /** Data of films. */
  filmsData: Film[] | [];

  /** Last visible doc. */
  lastVisibleDoc: QueryDocumentSnapshot | null;

  /** First visible doc. */
  firstVisibleDoc: QueryDocumentSnapshot | null;

  /** Type of sorting.*/
  sortingType: string;

  /** Length of snapshot.*/
  snapshotLength: number | null;

  /** Limit of documents.*/
  readonly limitDocs: number;

  /** Number of pages.*/
  numberOfPages: number;

  /** Current page number.*/
  currentPageNumber: number;

  /** Function to get films data.
   * @param sortingType - Type of sorting.
   */
  getFilmsData: (sortingType?: string) => Promise<void>;

  /** Function to display next page with films. */
  nextPage: () => Promise<void>;

  /** Function to display previous page with films. */
  prevPage: () => Promise<void>;

  /** Function to get number of pages. */
  getNumberOfPages: () => Promise<void>;

  /** Function to get list of films collection.
   * @param queryForFilms - Query to get data of films.
   */
  getFilmsList: (queryForFilms: Query<DocumentData>) => Promise<void>;
}
