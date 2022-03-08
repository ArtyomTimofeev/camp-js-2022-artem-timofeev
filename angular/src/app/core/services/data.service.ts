import { PageEvent } from '@angular/material/paginator';
import { Injectable } from '@angular/core';
import {
  collection, Firestore, doc, addDoc, docData,
  deleteDoc, updateDoc, DocumentReference, CollectionReference,
} from '@angular/fire/firestore';
import { defer, map, Observable, tap } from 'rxjs';
import { AngularFirestore, Query, QueryDocumentSnapshot, QueryFn } from '@angular/fire/compat/firestore';
import { Sort } from '@angular/material/sort';

import { FilmMapper } from './mappers/film.mapper';
import { FilmDto } from './mappers/dto/film.dto';
import { Film } from './models/film';

/**
 * Data service.
 */
@Injectable({
  providedIn: 'root',
})
export class DataService {

  private lastVisibleDoc: QueryDocumentSnapshot<FilmDto> | null = null;

  private firstVisibleDoc: QueryDocumentSnapshot<FilmDto> | null = null;

  private currentPageNumber = 0;

  private currentPageSize = 6;

  private isLengthEdit = false;

  private constructor(
    private readonly firestore: Firestore,
    private readonly filmMapper: FilmMapper,
    private afs: AngularFirestore,
  ) {}

  /**
   * Function to get data of films collection.
   * @param pageConfig - Page config.
   * @param sortConfig - Sort config.
   * @param sd - Sort config.
   */
  public getFilms(pageConfig: PageEvent, sortConfig: Sort | null, sd: any): Observable<Film[]> {
    const filmsCollection = this.afs.collection<FilmDto>('films', this.getQueryFunc(pageConfig, sortConfig, sd));
    return filmsCollection.snapshotChanges().pipe(
      tap(snapshot => {
        if (snapshot.length > 0) {
          this.currentPageNumber = pageConfig.pageIndex;
          this.currentPageSize = pageConfig.pageSize;
          this.lastVisibleDoc = snapshot[snapshot.length - 1].payload.doc;
          this.firstVisibleDoc = snapshot[0].payload.doc;
        }
      }),
      map(snapshot => snapshot.map(s => s.payload.doc.data())),
      map(list => list.map(dto => this.filmMapper.fromDto(dto))),
    );
  }

  /**
   * Function to get query.
   * @param pageConfig - Page config.
   * @param sortConfig - Sort config.
   */
  private getQueryFunc(pageConfig: PageEvent, sortConfig: Sort | null, sd: any): QueryFn {
    return ref => {
      const sortQuery = this.filmMapper.toDtoSortConfig(sortConfig as Sort);
      let query = ref.limit(pageConfig.pageSize);
      if (sd !== '') {
        const veryBigSymbol = '\uf8ff';
        query = query.where('fields.title', '>=', sd)
          .where('fields.title', '<=', `${sd}${veryBigSymbol}`);
      }
      if (sortQuery) {
        query = query.orderBy(sortQuery.fieldPath, sortQuery.directionStr);
        query = this.getQueryOnPagination(pageConfig, query);
      }
      if (!sortQuery) {
        query = this.getQueryOnPagination(pageConfig, query);
      }
      return query;
    };
  }

  /**
   * Function to get query when using pagination.
   * @param pageConfig - Page config.
   * @param query - Initial query.
   */
  private getQueryOnPagination(pageConfig: PageEvent, query: Query): Query {
    if (pageConfig.pageIndex > this.currentPageNumber && pageConfig.pageSize === this.currentPageSize) {
      return query.startAfter(this.lastVisibleDoc);
    }
    if (pageConfig.pageIndex < this.currentPageNumber && pageConfig.pageSize === this.currentPageSize) {
      return query.endAt(this.firstVisibleDoc);
    }
    pageConfig.pageIndex = 0;
    return query;
  }

  /**
   * Function to get film doc by id.
   * @param id - Doc id.
   */
  public getFilmById(id: string): Observable<Film> {
    const filmDocRef = doc(this.firestore, `films/${id}`) as DocumentReference<FilmDto>;
    return docData(filmDocRef, { idField: 'id' }).pipe(
      map(filmDto => this.filmMapper.fromDto(filmDto)),
    );
  }

  /**
   * Function to add film doc to films collection.
   * @param film - Added film doc.
   */
  public addFilm(film: FilmDto): Observable<string> {
    const filmsRef = collection(this.firestore, 'films') as CollectionReference<FilmDto>;
    return defer(() => addDoc(filmsRef, film)).pipe(
      map(dto => dto.id),
    );
  }

  /**
   * Function to delete film doc from films collection.
   * @param id - Removable film doc.
   */
  public deleteFilm(id: string): Observable<void> {
    const filmDocRef = doc(this.firestore, `films/${id}`) as DocumentReference<FilmDto>;
    return defer(() => deleteDoc(filmDocRef));
  }

  /**
   * Function to update film doc in films collection.
   * @param film - Updated film doc.
   */
  public updateFilm(film: Film): Observable<void> {
    const dto = this.filmMapper.toDto(film);
    const filmDocRef = doc(this.firestore, `films/${film.id}`);
    return defer(() => updateDoc(filmDocRef, { ...dto }));
  }
}
