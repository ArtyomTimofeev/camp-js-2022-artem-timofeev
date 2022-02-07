import { getAuth } from 'firebase/auth';
import { query, collection, getDocs, orderBy, limit, startAfter, endBefore, limitToLast, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';

import { FilmsSortingType } from '../entities/enums/filmSortingTypeEnum';
import { filmMapper } from '../entities/mappers/filmMapper';
import { FilmDocumentDTO } from '../entities/DTOs/filmDTO';

import { db } from './firebase-config';

export const auth = getAuth();

/**
 *  Universal manager class that allows to work with the data of any collection.
 */
export class ListManager {

  /** Method to get dataOfListItems. */
  public get dataOfListItemsGetter(): DocumentData {
    return this.dataOfListItems;
  }

  /** Method to get numberOfPages. */
  public get numberOfPagesGetter(): number {
    return this.numberOfPages;
  }

  /** Method to get currentPageNumber. */
  public get currentPageNumberGetter(): number {
    return this.currentPageNumber;
  }

  private dataOfListItems: [] | DocumentData = [];

  private numberOfPages = 1;

  private collectionName: string;

  private currentPageNumber = 1;

  private sortingType: string = FilmsSortingType.Default;

  private firstVisibleDoc: QueryDocumentSnapshot<unknown> | null = null;

  private lastVisibleDoc: QueryDocumentSnapshot<unknown> | null = null;

  private limitDocs = 3;

  public constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  /**
   * Function to get first page of table with data of list items.
   * @param sortingType - Type of sorting.
   */
  public async firstPage(sortingType = this.sortingType): Promise<void> {
    this.currentPageNumber = 1;
    this.sortingType = sortingType;
    this.getNumberOfPages();
    const queryForFilms = query(collection(db, this.collectionName), orderBy(String(sortingType), 'asc'), limit(this.limitDocs));
    await this.getItemsList(queryForFilms);
  }

  /**
   * Function to get next page of table with data of list items.
   */
  public async nextPage(): Promise<void> {
    this.currentPageNumber++;
    const queryForFilms = query(collection(db, this.collectionName),
      orderBy(this.sortingType, 'asc'),
      limit(this.limitDocs),
      startAfter(this.lastVisibleDoc));
    await this.getItemsList(queryForFilms);
  }

  /**
   * Function to get previous page of table with data of list items.
   */
  public async prevPage(): Promise<void> {
    this.currentPageNumber--;
    const queryForFilms = query(collection(db, this.collectionName),
      orderBy(this.sortingType, 'asc'),
      limitToLast(this.limitDocs),
      endBefore(this.firstVisibleDoc));
    await this.getItemsList(queryForFilms);
  }

  private async getNumberOfPages(): Promise<void> {
    const queryForFilms = query(collection(db, this.collectionName));
    const filmsSnapshot = await getDocs(queryForFilms);
    const numberOfAllDocs = filmsSnapshot.docs.length;
    this.numberOfPages = Math.ceil(numberOfAllDocs / this.limitDocs);
  }

  private async getItemsList(queryForFilms): Promise<void> {
    const filmsSnapshot = await getDocs(queryForFilms);
    const filmDocuments = filmsSnapshot.docs.map(doc => doc.data() as FilmDocumentDTO);
    this.firstVisibleDoc = filmsSnapshot.docs[0];
    this.lastVisibleDoc = filmsSnapshot.docs[filmsSnapshot.docs.length - 1];
    this.dataOfListItems = filmDocuments.map(filmDocument => filmMapper.fromDto(filmDocument));
  }
}
