import { Injectable } from '@angular/core';
import {
  collection, Firestore, doc, addDoc, docData,
  deleteDoc, updateDoc, DocumentReference, CollectionReference,
} from '@angular/fire/firestore';
import { defer, map, Observable, tap } from 'rxjs';
import { AngularFirestore, QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
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

  /** Last visible doc as cursor to paginate data. */
  public lastVisibleDoc: QueryDocumentSnapshot<FilmDto> | null = null;

  /** First visible doc as cursor to paginate data. */
  public firstVisibleDoc: QueryDocumentSnapshot<FilmDto> | null = null;

  private constructor(
    private readonly firestore: Firestore,
    private readonly filmMapper: FilmMapper,
    private afs: AngularFirestore,
  ) {}

  /**
   * Function to get data of films collection.
   * @param pageSize - Number of elements on page.
   * @param sortingType - Type of sorting.
   */
  public getFilms(pageSize: number, sortingType: Sort): Observable<Film[]> {
    const sortQuery = this.filmMapper.toDtoSortQuery(sortingType);
    const filmsCollection = this.afs.collection<FilmDto>('films', ref => {
      if (sortQuery) {
        return ref.limit(pageSize).orderBy(sortQuery.fieldPath, sortQuery.directionStr);
      }
      return ref.limit(pageSize);
    });
    return filmsCollection.snapshotChanges().pipe(
      tap(snapshot => {
        this.lastVisibleDoc = snapshot[snapshot.length - 1].payload.doc;
        this.firstVisibleDoc = snapshot[0].payload.doc;
      }),
      map(snapshot => snapshot.map(s => s.payload.doc.data())),
      map(list => list.map(dto => this.filmMapper.fromDto(dto))),
    );
  }

  public nextPage(pageSize: number): Observable<FilmDto[]> {
    const filmsCollection = this.afs.collection<FilmDto>('films', ref => ref.limit(pageSize).startAfter(this.lastVisibleDoc));
    return filmsCollection.valueChanges();
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
