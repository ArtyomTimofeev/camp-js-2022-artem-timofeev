import { defer, map, mapTo, Observable, tap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Injectable } from '@angular/core';
import {
  collection, Firestore, doc, addDoc, docData,
  deleteDoc, updateDoc, DocumentReference, CollectionReference,
} from '@angular/fire/firestore';
import { AngularFirestore, QueryDocumentSnapshot, QueryFn } from '@angular/fire/compat/firestore';
import { Sort } from '@angular/material/sort';

import { Film } from '../models/film';
import { DEFAULT_SORT_DIRECTION, FILMS_COLLECTION, TITLE_PROPERTY, FIREBASE_SYMBOL_ENCODING } from '../utils/constants';
import { TableConfig } from '../models/table-config';

import { FilmMapper } from './mappers/film.mapper';
import { FilmDto } from './mappers/dto/film.dto';

/**
 * Films Data service.
 */
@Injectable({
  providedIn: 'root',
})
export class FilmsService {

  private lastVisibleDoc: QueryDocumentSnapshot<FilmDto> | null = null;

  private firstVisibleDoc: QueryDocumentSnapshot<FilmDto> | null = null;

  private constructor(
    private readonly firestore: Firestore,
    private readonly filmMapper: FilmMapper,
    private readonly angularFirestore: AngularFirestore,
  ) {}

  /**
   *  Gets data of films collection.
   * @param tableConfig - Table config.
   * @param searchValue - Search value.
   */
  public getFilms(tableConfig: TableConfig, searchValue: string): Observable<readonly Film[]> {
    const { pageConfig, sortConfig } = tableConfig;
    const filmsCollection = this.angularFirestore.collection<FilmDto>(FILMS_COLLECTION, this.getQuery(pageConfig, sortConfig, searchValue));
    return filmsCollection.snapshotChanges().pipe(
      tap(snapshot => {
        if (snapshot.length > 0) {
          this.lastVisibleDoc = snapshot[snapshot.length - 1].payload.doc;
          this.firstVisibleDoc = snapshot[0].payload.doc;
        }
      }),
      map(snapshot => snapshot.map(s => ({ ...s.payload.doc.data(), id: s.payload.doc.id }))),
      map(list => list.map(dto => this.filmMapper.fromDto(dto))),
    );
  }

  /**
   * Gets query for fetching films.
   * @param pageConfig - Page config.
   * @param sortConfig - Sorting config.
   * @param searchValue - Search value.
   */
  private getQuery(pageConfig: PageEvent, sortConfig: Sort, searchValue: string): QueryFn {
    return ref => {
      const sortQuery = this.filmMapper.toDtoSortConfig(sortConfig);
      const { pageIndex, previousPageIndex, pageSize } = pageConfig;
      const defaultQueryForFilms = ref.limit(pageSize);
      if (searchValue !== '') {
        return defaultQueryForFilms
          .where(TITLE_PROPERTY, '>=', searchValue)
          .where(TITLE_PROPERTY, '<=', `${searchValue}${FIREBASE_SYMBOL_ENCODING}`)
          .orderBy(TITLE_PROPERTY, DEFAULT_SORT_DIRECTION);
      }
      if (sortQuery?.direction) {
        const { direction, activeField } = sortQuery;
        if (pageIndex > Number(previousPageIndex)) {
          return defaultQueryForFilms.orderBy(activeField, direction).startAfter(this.lastVisibleDoc);
        }
        if (pageIndex < Number(previousPageIndex)) {
          return ref.limitToLast(pageSize).orderBy(activeField, direction)
            .endAt(this.firstVisibleDoc);
        }
        return defaultQueryForFilms.orderBy(activeField, direction);
      }
      if (!sortQuery?.direction) {
        if (pageIndex > Number(previousPageIndex)) {
          return defaultQueryForFilms.startAfter(this.lastVisibleDoc);
        }
        if (pageIndex < Number(previousPageIndex)) {
          return ref.limitToLast(pageSize).endAt(this.firstVisibleDoc);
        }
      }
      return defaultQueryForFilms;
    };
  }

  /**
   * Gets all films in collection.
   */
  public getAllFilms(): Observable<Film[]> {
    const itemsCollection = this.angularFirestore.collection<FilmDto>(FILMS_COLLECTION);
    return itemsCollection.snapshotChanges()
      .pipe(
        map(snapshot => snapshot.map(s => s.payload.doc.data())),
        map(list => list.map(dto => this.filmMapper.fromDto(dto))),
      );
  }

  /**
   * Gets film doc by id.
   * @param id - Doc id.
   */
  public getFilmById(id: Film['id']): Observable<Film> {
    const filmDocRef = doc(this.firestore, `${FILMS_COLLECTION}/${id}`) as DocumentReference<FilmDto>;
    return docData(filmDocRef, { idField: 'id' }).pipe(
      map(filmDto => this.filmMapper.fromDto(filmDto)),
    );
  }

  /**
   * Adds film doc to films collection.
   * @param film - Added film doc.
   */
  public addFilm(film: Film): Observable<void> {
    const filmDto = this.filmMapper.toDto(film);
    const filmsRef = collection(this.firestore, FILMS_COLLECTION) as CollectionReference<FilmDto>;
    return defer(() => addDoc(filmsRef, filmDto)).pipe(mapTo(void 0));
  }

  /**
   *  Deletes film doc from films collection.
   * @param id - Removable film id.
   */
  public deleteFilm(id: string): Observable<void> {
    const filmDocRef = doc(this.firestore, `${FILMS_COLLECTION}/${id}`);
    return defer(() => deleteDoc(filmDocRef));
  }

  /**
   * Updates film doc in films collection.
   * @param film - Updated film doc.
   */
  public updateFilm(film: Film): Observable<void> {
    const dto = this.filmMapper.toDto(film);
    const filmDocRef = doc(this.firestore, `${FILMS_COLLECTION}/${film.id}`);
    return defer(() => updateDoc(filmDocRef, { ...dto }));
  }
}
