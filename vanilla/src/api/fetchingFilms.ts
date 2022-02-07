import { getAuth } from 'firebase/auth';
import { query, collection, getDocs, orderBy, limit, startAfter, endBefore, limitToLast, QueryDocumentSnapshot } from 'firebase/firestore';

import { FILMS_COLLECTION } from '../utils/constants';
import { FilmsSortingType } from '../entities/enums/filmSortingTypeEnum';
import { filmMapper } from '../entities/mappers/filmMapper';
import { FilmDocumentDTO } from '../entities/DTOs/filmDTO';

import { Film } from './../entities/models/film';
import { FilmsSortingType } from './../entities/enums/filmSortingTypeEnum';
import { fetchFilms } from './fetchingFilms';

import { db } from './firebase-config';

export const auth = getAuth();

// export const fetchFilms: FetchFilms = {

//   filmsData: [],

//   lastVisibleDoc: null,

//   firstVisibleDoc: null,

//   sortingType: FilmsSortingType.Default,

//   snapshotLength: null,

//   limitDocs: 2,

//   numberOfPages: 1,

//   currentPageNumber: 1,

//   async nextPage() {
//     this.currentPageNumber++;
//     const queryForFilms = query(collection(db, FILMS_COLLECTION),
//       orderBy(this.sortingType, 'asc'),
//       limit(this.limitDocs),
//       startAfter(this.lastVisibleDoc));
//     await this.getFilmsList(queryForFilms);
//   },

//   async prevPage() {
//     this.currentPageNumber--;
//     const queryForFilms = query(collection(db, FILMS_COLLECTION),
//       orderBy(this.sortingType, 'asc'),
//       limitToLast(this.limitDocs),
//       endBefore(this.firstVisibleDoc));
//     await this.getFilmsList(queryForFilms);
//   },

//   async getNumberOfPages() {
//     const queryForFilms = query(collection(db, FILMS_COLLECTION));
//     const filmsSnapshot = await getDocs(queryForFilms);
//     const numberOfAllDocs = filmsSnapshot.docs.length;
//     this.numberOfPages = Math.ceil(numberOfAllDocs / this.limitDocs);
//   },

//   async getFilmsList(queryForFilms) {
//     const filmsSnapshot = await getDocs(queryForFilms);
//     const filmDocuments = filmsSnapshot.docs.map(doc => doc.data() as FilmDocumentDTO);
//     this.firstVisibleDoc = filmsSnapshot.docs[0];
//     this.lastVisibleDoc = filmsSnapshot.docs[filmsSnapshot.docs.length - 1];
//     this.filmsData = filmDocuments.map(filmDocument => filmMapper.fromDto(filmDocument));
//   },
// };

interface Options<TSort, TFilter> {
  collectionName: string;
  defaultFilter?: TFilter;
  defaultSort: TSort;
}

class ListManager<TModel, TSort, TFilter> {
  private readonly collectionName: string;

  private sortingType: TSort;

  public constructor(options: Options<TSort, TFilter>) {
    this.collectionName = options.collectionName;
    this.sortingType = options.defaultSort;
  }

  private dataOfListItems: TModel[] = [];

  public get getData(): TModel[] {
    return this.dataOfListItems;
  }

  private lastVisibleDoc: QueryDocumentSnapshot | null = null;

  private firstVisibleDoc: null;

  private limitDocs = 2;

  public numberOfPages: 1;

  public currentPageNumber: 1;

  public async firstPage(sortingType = this.sortingType): Promise<void> {
    this.currentPageNumber = 1;
    this.sortingType = sortingType;
    this.getNumberOfPages();
    const queryForFilms = query(collection(db, FILMS_COLLECTION), orderBy(String(sortingType), 'asc'), limit(this.limitDocs));
    await this.getFilmsList(queryForFilms);
  }

  public async nextPage(): Promise<void> {
    this.currentPageNumber++;
    const queryForFilms = query(collection(db, FILMS_COLLECTION),
      orderBy(this.sortingType, 'asc'),
      limit(this.limitDocs),
      startAfter(this.lastVisibleDoc));
    await this.getFilmsList(queryForFilms);
  }

  public async prevPage(): Promise<void> {
    this.currentPageNumber--;
    const queryForFilms = query(collection(db, FILMS_COLLECTION),
      orderBy(this.sortingType, 'asc'),
      limitToLast(this.limitDocs),
      endBefore(this.firstVisibleDoc));
    await this.getFilmsList(queryForFilms);
  }

  private async getNumberOfPages(): Promise<void> {
    const queryForFilms = query(collection(db, FILMS_COLLECTION));
    const filmsSnapshot = await getDocs(queryForFilms);
    const numberOfAllDocs = filmsSnapshot.docs.length;
    this.numberOfPages = Math.ceil(numberOfAllDocs / this.limitDocs);
  }

  private async getFilmsList(queryForFilms): Promise<void> {
    const filmsSnapshot = await getDocs(queryForFilms);
    const filmDocuments = filmsSnapshot.docs.map(doc => doc.data() as FilmDocumentDTO);
    this.firstVisibleDoc = filmsSnapshot.docs[0];
    this.lastVisibleDoc = filmsSnapshot.docs[filmsSnapshot.docs.length - 1];
    this.dataOfListItems = filmDocuments.map(filmDocument => filmMapper.fromDto(filmDocument));
  }
}

export const fetchFilms = new ListManager<Film, FilmsSortingType, {}>({ collectionName: FILMS_COLLECTION, defaultSort: FilmsSortingType.Default });
fetchFilms.firstPage(FilmsSortingType.Default);

//  <a href="/example/?id=123">Go to example page</a>

const params = new URLSearchParams(window.location.search);
params.get('id');
