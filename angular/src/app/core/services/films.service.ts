import { defer, map, Observable, tap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Injectable } from '@angular/core';
import {
  collection, Firestore, doc, addDoc, docData,
  deleteDoc, updateDoc, DocumentReference, CollectionReference,
} from '@angular/fire/firestore';
import { AngularFirestore, QueryDocumentSnapshot, QueryFn } from '@angular/fire/compat/firestore';
import { Sort } from '@angular/material/sort';

import { Film } from '../models/film';
import { ASCENDING_SORT_DIRECTION, FILMS_COLLECTION, TITLE_PROPERTY, VERY_BIG_SYMBOL } from '../utils/constants';

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
    private afs: AngularFirestore,
  ) {}

  /**
   * Function to get data of films collection.
   * @param pageConfig - Page config.
   * @param sortConfig - Sorting config.
   * @param searchValue - Search value.
   */
  public getFilms(pageConfig: PageEvent, sortConfig: Sort, searchValue: string): Observable<Film[]> {
    const filmsCollection = this.afs.collection<FilmDto>(FILMS_COLLECTION, this.getQueryFunc(pageConfig, sortConfig, searchValue));
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
   * Function to get query.
   * @param pageConfig - Page config.
   * @param sortConfig - Sorting config.
   * @param searchValue - Search value.
   */
  private getQueryFunc(pageConfig: PageEvent, sortConfig: Sort, searchValue: string): QueryFn {
    return ref => {
      const sortQuery = this.filmMapper.toDtoSortConfig(sortConfig);
      const { pageIndex, previousPageIndex, pageSize } = pageConfig;
      const defaultQuery = ref.limit(pageSize);
      if (searchValue !== '') {
        return ref.limit(pageSize)
          .where(TITLE_PROPERTY, '>=', searchValue)
          .where(TITLE_PROPERTY, '<=', `${searchValue}${VERY_BIG_SYMBOL}`)
          .orderBy(TITLE_PROPERTY, ASCENDING_SORT_DIRECTION);
      }
      if (sortQuery?.direction) {
      const { direction, activeField } = sortQuery;
        if (pageIndex > Number(previousPageIndex)) {
          return defaultQuery.orderBy(activeField, direction).startAfter(this.lastVisibleDoc);
        }
        if (pageIndex < Number(previousPageIndex)) {
          return ref.limitToLast(pageSize).orderBy(activeField, direction)
            .endAt(this.firstVisibleDoc);
        }
        return defaultQuery.orderBy(activeField, direction);
      }
      if (!sortQuery) {
        if (pageIndex > Number(previousPageIndex)) {
          return defaultQuery.startAfter(this.lastVisibleDoc);
        }
        if (pageIndex < Number(previousPageIndex)) {
          return ref.limitToLast(pageSize).endAt(this.firstVisibleDoc);
        }
      }
      return defaultQuery;
    };
  }

  /**
   * Function to get film doc by id.
   * @param id - Doc id.
   */
  public getFilmById(id: string): Observable<Film> {
    const filmDocRef = doc(this.firestore, `${FILMS_COLLECTION}/${id}`) as DocumentReference<FilmDto>;
    return docData(filmDocRef, { idField: 'id' }).pipe(
      map(filmDto => this.filmMapper.fromDto(filmDto)),
    );
  }

  /**
   * Function to add film doc to films collection.
   * @param film - Added film doc.
   */
  public addFilm(film: FilmDto): Observable<string> {
    const filmsRef = collection(this.firestore, FILMS_COLLECTION) as CollectionReference<FilmDto>;
    return defer(() => addDoc(filmsRef, film)).pipe(
      map(dto => dto.id),
    );
  }

  /**
   * Function to delete film doc from films collection.
   * @param id - Removable film doc.
   */
  public deleteFilm(id: string): Observable<void> {
    const filmDocRef = doc(this.firestore, `${FILMS_COLLECTION}/${id}`) as DocumentReference<FilmDto>;
    return defer(() => deleteDoc(filmDocRef));
  }

  /**
   * Function to update film doc in films collection.
   * @param film - Updated film doc.
   */
  public updateFilm(film: Film): Observable<void> {
    const dto = this.filmMapper.toDto(film);
    const filmDocRef = doc(this.firestore, `${FILMS_COLLECTION}/${film.id}`);
    return defer(() => updateDoc(filmDocRef, { ...dto }));
  }
}
