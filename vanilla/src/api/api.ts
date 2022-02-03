import { getAuth } from 'firebase/auth';
import { query, collection, getDocs, orderBy, QuerySnapshot, DocumentData } from 'firebase/firestore';

import { FILMS_COLLECTION } from '../utils/constants';
import { FilmsSortingType } from '../entities/enums/filmSortingTypeEnum';
import { filmMapper } from '../entities/mappers/filmMapper';
import { FilmDocumentDTO } from '../entities/DTOs/filmDTO';

import { Film } from './../entities/models/film';
import { db } from './firebase-config';

export const auth = getAuth();

/**
 * Gets film list from collection.
 * @param sortingType - Type of selected sort.
 */

export const getFilms = async(sortingType = FilmsSortingType.Default): Promise<Film[]> => {
  const queryForFilms = query(collection(db, FILMS_COLLECTION), orderBy(sortingType, 'asc'));
  const filmsSnapshot = await getDocs(queryForFilms);
  const filmDocuments = filmsSnapshot.docs.map(doc => doc.data() as FilmDocumentDTO);
  return filmDocuments.map(filmDocument => filmMapper.fromDto(filmDocument));
};

interface FetchOptions<T> {
  readonly startFrom: T | null;
  readonly sort?: string;
}

type FetchFunctionType<T> = (options: FetchOptions<T>) => Promise<T[]>;
export class ListManager<T> {
  private readonly fetchDataFunc: FetchFunctionType<T>;

  private lastVisibleElement: T | null = null;

  private sort?: string;

  private readonly allItems: T[] = [];

  private readonly pageSize = 10;

  private currentPage = 1;

  public constructor(fetchFunction: FetchFunctionType<T>) {
    this.fetchDataFunc = fetchFunction;
  }

  public async nextPage(): Promise<T[]> {
    const list = await this.fetchDataFunc({
      startFrom: this.lastVisibleElement,
      sort: this.sort,
    });
    this.currentPage++;
    this.allItems.push(...list);

    this.lastVisibleElement = list[list.length - 1];

    return list;
  }

  public prevPage(): T[] {
    if (this.currentPage === 1) {
      return this.allItems;
    }
    this.currentPage--;
    const start = this.currentPage * this.pageSize;
    return this.allItems.splice(start, this.pageSize);
  }

  public setSort(): void {
    this.allItems.splice(0, this.allItems.length);
    this.currentPage = 1;
  }
}

const filmsListManager = new ListManager(options => getFilms(options.sort as any));
filmsListManager.nextPage();

filmsListManager.setSort();
