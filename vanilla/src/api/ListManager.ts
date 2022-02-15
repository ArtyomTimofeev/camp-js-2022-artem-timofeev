import { getAuth } from 'firebase/auth';
import { query, collection, getDocs, orderBy, limit, startAfter, endBefore, limitToLast, QueryDocumentSnapshot, where, Query, doc, deleteDoc } from 'firebase/firestore';

import { FilmsSortingType } from '../entities/enums/filmSortingTypeEnum';
import { filmMapper, IMapperFromDto } from '../entities/mappers/filmMapper';
import { FILMS_COLLECTION } from '../utils/constants';

import { db } from './firebase-config';

export const auth = getAuth();

/** Constant for title searching. */
const veryBigSymbol = '\uf8ff';

/**
 *  Universal manager class that allows to work with the data of any collection.
 */
export class ListManager<TDto, TModel> {

  /** Method to set searchString. */
  public set searchString(searchString: string) {
    this._searchString = searchString;
  }

  /** Method to set sortingType. */
  public set sortingType(newSortingType: FilmsSortingType) {
    this._sortingType = newSortingType;
  }

  /** Method to get dataOfListItems. */
  public get dataOfListItems(): TModel[] {
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

  private _dataOfListItems: TModel[] = [];

  private _numberOfPages = 1;

  private _collectionName: string;

  private _currentPageNumber = 1;

  private _sortingType: FilmsSortingType = FilmsSortingType.Default;

  private _firstVisibleDoc: QueryDocumentSnapshot<unknown> | null = null;

  private _lastVisibleDoc: QueryDocumentSnapshot<unknown> | null = null;

  private _limitDocs = 3;

  private _searchString = '';

  private readonly mapper: IMapperFromDto<TDto, TModel>;

  public constructor(collectionName: string, mapper: IMapperFromDto<TDto, TModel>) {
    this._collectionName = collectionName;
    this.mapper = mapper;
  }

  /**
   * Function to get first page of table with data of list items.
   * @param sortingType - Type of sorting.
   */
  public async firstPage(sortingType = this._sortingType): Promise<void> {
    this._currentPageNumber = 1;
    this._sortingType = sortingType;
    this.getNumberOfPages();
    let queryForDocs: Query;
    if (this._searchString === '') {
      queryForDocs = query(collection(db, this._collectionName), orderBy(String(sortingType), 'asc'), limit(this._limitDocs));
    } else {
      queryForDocs = query(collection(db, this._collectionName),
        orderBy(this._sortingType, 'asc'),
        limit(this._limitDocs),
        where(this._sortingType, '>=', this._searchString),
        where(this._sortingType, '<=', `${this._searchString}${veryBigSymbol}`));
    }
    await this.getDocsList(queryForDocs);
  }

  /**
   * Function to get next page of table with data of list items.
   */
  public async nextPage(): Promise<void> {
    this._currentPageNumber++;
    let queryForDocs: Query;
    if (this._searchString === '') {
      queryForDocs = query(collection(db, this._collectionName),
        orderBy(this._sortingType, 'asc'),
        limit(this._limitDocs),
        startAfter(this._lastVisibleDoc));
    } else {
      queryForDocs = query(collection(db, this._collectionName),
        orderBy(this._sortingType, 'asc'),
        limit(this._limitDocs),
        startAfter(this._lastVisibleDoc),
        where(this._sortingType, '>=', this._searchString),
        where(this._sortingType, '<=', `${this._searchString}${veryBigSymbol}`));
    }
    await this.getDocsList(queryForDocs);
  }

  /**
   * Function to get previous page of table with data of list items.
   */
  public async prevPage(): Promise<void> {
    this._currentPageNumber--;
    let queryForDocs: Query;
    if (this._searchString === '') {
      queryForDocs = query(collection(db, this._collectionName),
        orderBy(this._sortingType, 'asc'),
        limitToLast(this._limitDocs),
        endBefore(this._firstVisibleDoc));
    } else {
      queryForDocs = query(collection(db, this._collectionName),
        orderBy(this._sortingType, 'asc'),
        limitToLast(this._limitDocs),
        endBefore(this._firstVisibleDoc),
        where(this._sortingType, '>=', this._searchString),
        where(this._sortingType, '<=', `${this._searchString}${veryBigSymbol}`));
    }
    await this.getDocsList(queryForDocs);
  }

  /**
   * Function to get doc item of collection.
   * @param queryForDocItem Query for doc item.
   * @returns Model of doc item.
   */
  public async getDocItem(queryForDocItem): Promise<TModel> {
    const filmDoc = await getDocs(queryForDocItem);
    return this.mapper.fromDto({ ...filmDoc.docs[0].data() as TDto, id: filmDoc.docs[0].id });
  }

  /**
   * Function to delete item of collection.
   * @param id - Unique hash id of collection item.
   */
  public async deleteItemOfCollection(id: string): Promise<void> {
    const itemDoc = doc(db, this._collectionName, id);
    await deleteDoc(itemDoc);
  }

  private async getNumberOfPages(): Promise<void> {
    let queryForItems: Query;
    if (this._searchString === '') {
      queryForItems = query(collection(db, this._collectionName));
    } else {
      queryForItems = query(collection(db, this._collectionName),
        where(this._sortingType, '>=', this._searchString),
        where(this._sortingType, '<=', `${this._searchString}${veryBigSymbol}`));
    }

    const docsSnapshot = await getDocs(queryForItems);
    const numberOfAllDocs = docsSnapshot.docs.length;
    this._numberOfPages = Math.ceil(numberOfAllDocs / this._limitDocs);
  }

  private async getDocsList(queryForDocs: Query): Promise<void> {
    const docsSnapshot = await getDocs(queryForDocs);
    const docs = docsSnapshot.docs.map(docElem => ({ ...docElem.data() as TDto, id: docElem.id }));
    this._firstVisibleDoc = docsSnapshot.docs[0];
    this._lastVisibleDoc = docsSnapshot.docs[docsSnapshot.docs.length - 1];
    this._dataOfListItems = docs.map(filmDocument => this.mapper.fromDto(filmDocument));
  }
}
export const filmsList = new ListManager(FILMS_COLLECTION, filmMapper);
