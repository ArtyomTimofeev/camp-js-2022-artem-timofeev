import { getAuth } from 'firebase/auth';
import { query, collection, getDocs, orderBy, limit, startAfter, endBefore, limitToLast, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';

import { FilmsSortingType } from '../entities/enums/filmSortingTypeEnum';
import { filmMapper } from '../entities/mappers/filmMapper';
import { FilmDocumentDTO } from '../entities/DTOs/filmDTO';

import { FILMS_COLLECTION } from '../utils/constants';

import { db } from './firebase-config';

export const auth = getAuth();

/**
 *  Universal manager class that allows to work with the data of any collection.
 */
export class ListManager {

  /** Method to get dataOfListItems. */
  public get dataOfListItems(): DocumentData {
    return this._dataOfListItems;
  }

  /** Method to get numberOfPages. */
  public get numberOfPages(): number {
    return this._numberOfPages;
  }

  /** Method to get currentPageNumber. */
  public get currentPageNumber(): number {
    return this._currentPageNumber;
  }

  private _dataOfListItems: [] | DocumentData = [];

  private _numberOfPages = 1;

  private _collectionName: string;

  private _currentPageNumber = 1;

  private _sortingType: string = FilmsSortingType.Default;

  private _firstVisibleDoc: QueryDocumentSnapshot<unknown> | null = null;

  private _lastVisibleDoc: QueryDocumentSnapshot<unknown> | null = null;

  private _limitDocs = 3;

  public constructor(collectionName: string) {
    this._collectionName = collectionName;
  }

  /**
   * Function to get first page of table with data of list items.
   * @param sortingType - Type of sorting.
   */
  public async firstPage(sortingType = this._sortingType): Promise<void> {
    this._currentPageNumber = 1;
    this._sortingType = sortingType;
    this.getNumberOfPages();
    const queryForDocs = query(collection(db, this._collectionName), orderBy(String(sortingType), 'asc'), limit(this._limitDocs));
    await this.getDocsList(queryForDocs);
  }

  /**
   * Function to get next page of table with data of list items.
   */
  public async nextPage(): Promise<void> {
    this._currentPageNumber++;
    const queryForDocs = query(collection(db, this._collectionName),
      orderBy(this._sortingType, 'asc'),
      limit(this._limitDocs),
      startAfter(this._lastVisibleDoc));
    await this.getDocsList(queryForDocs);
  }

  /**
   * Function to get previous page of table with data of list items.
   */
  public async prevPage(): Promise<void> {
    this._currentPageNumber--;
    const queryForDocs = query(collection(db, this._collectionName),
      orderBy(this._sortingType, 'asc'),
      limitToLast(this._limitDocs),
      endBefore(this._firstVisibleDoc));
    await this.getDocsList(queryForDocs);
  }

  private async getNumberOfPages(): Promise<void> {
    const queryForItems = query(collection(db, this._collectionName));
    const docsSnapshot = await getDocs(queryForItems);
    const numberOfAllDocs = docsSnapshot.docs.length;
    this._numberOfPages = Math.ceil(numberOfAllDocs / this._limitDocs);
  }

  private async getDocsList(queryForDocs): Promise<void> {
    const docsSnapshot = await getDocs(queryForDocs);
    const docs = docsSnapshot.docs.map(doc => ({ ...doc.data() as FilmDocumentDTO, id: doc.id }));
    this._firstVisibleDoc = docsSnapshot.docs[0];
    this._lastVisibleDoc = docsSnapshot.docs[docsSnapshot.docs.length - 1];
    this._dataOfListItems = docs.map(filmDocument => filmMapper.fromDto(filmDocument));
  }
}
export const filmsList = new ListManager(FILMS_COLLECTION);
