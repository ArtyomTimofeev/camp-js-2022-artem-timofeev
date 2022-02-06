import { getAuth } from 'firebase/auth';
import { query, collection, getDocs, orderBy, limit, startAfter, endBefore, limitToLast } from 'firebase/firestore';

import { FILMS_COLLECTION } from '../utils/constants';
import { FilmsSortingType } from '../entities/enums/filmSortingTypeEnum';
import { filmMapper } from '../entities/mappers/filmMapper';
import { FilmDocumentDTO } from '../entities/DTOs/filmDTO';

import { FetchFilms } from './../entities/models/fetchFilms';

import { db } from './firebase-config';

export const auth = getAuth();

export const fetchFilms: FetchFilms = {

  filmsData: [],

  lastVisibleDoc: null,

  firstVisibleDoc: null,

  sortingType: FilmsSortingType.Default,

  snapshotLength: null,

  limitDocs: 2,

  numberOfPages: 1,

  currentPageNumber: 1,

  async getFilmsData(sortingType = FilmsSortingType.Default) {
    this.currentPageNumber = 1;
    this.sortingType = sortingType;
    this.getNumberOfPages();
    const queryForFilms = query(collection(db, FILMS_COLLECTION), orderBy(sortingType, 'asc'), limit(this.limitDocs));
    await this.getFilmsList(queryForFilms);
  },

  async nextPage() {
    this.currentPageNumber++;
    const queryForFilms = query(collection(db, FILMS_COLLECTION),
      orderBy(this.sortingType, 'asc'),
      limit(this.limitDocs),
      startAfter(this.lastVisibleDoc));
    await this.getFilmsList(queryForFilms);
  },

  async prevPage() {
    this.currentPageNumber--;
    const queryForFilms = query(collection(db, FILMS_COLLECTION),
      orderBy(this.sortingType, 'asc'),
      limitToLast(this.limitDocs),
      endBefore(this.firstVisibleDoc));
    await this.getFilmsList(queryForFilms);
  },

  async getNumberOfPages() {
    const queryForFilms = query(collection(db, FILMS_COLLECTION));
    const filmsSnapshot = await getDocs(queryForFilms);
    const numberOfAllDocs = filmsSnapshot.docs.length;
    this.numberOfPages = Math.ceil(numberOfAllDocs / this.limitDocs);
  },

  async getFilmsList(queryForFilms) {
    const filmsSnapshot = await getDocs(queryForFilms);
    const filmDocuments = filmsSnapshot.docs.map(doc => doc.data() as FilmDocumentDTO);
    this.firstVisibleDoc = filmsSnapshot.docs[0];
    this.lastVisibleDoc = filmsSnapshot.docs[filmsSnapshot.docs.length - 1];
    this.filmsData = filmDocuments.map(filmDocument => filmMapper.fromDto(filmDocument));
  },
};
