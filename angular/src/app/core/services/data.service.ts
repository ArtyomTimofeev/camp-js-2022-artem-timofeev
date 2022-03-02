import { Injectable } from '@angular/core';
import {
  collection, Firestore, doc, addDoc, docData,
  deleteDoc, updateDoc, DocumentReference, CollectionReference,
} from '@angular/fire/firestore';
import { defer, map, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

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

  private defaultPageSize = 3;

  private filmsCollection: AngularFirestoreCollection<FilmDto>;

  public films$: Observable<FilmDto[]>;

  /** Last visible doc as cursor to paginate data. */
  public lastVisibleDoc: any = null;

  /** First visible doc as cursor to paginate data. */
  public firstVisibleDoc: any = null;

  private constructor(
    private readonly firestore: Firestore,
    private readonly filmMapper: FilmMapper,
    private afs: AngularFirestore,
  ) {
    this.filmsCollection = afs.collection<FilmDto>('films', ref => ref.limit(this.defaultPageSize));
    this.films$ = this.filmsCollection.valueChanges();
  }

  public nextPage(): void {
    this.afs.collection<FilmDto>('films', ref => ref.limit(this.defaultPageSize).startAfter(this.lastVisibleDoc));
  }

  /**
   * Function to get data of films collection.
   * @param pageSize - Number of elements on page.
   */
  public getFilms(pageSize: number = this.defaultPageSize): Observable<Film[]> {
    this.defaultPageSize = pageSize;
    const filmsCollection = this.afs.collection<FilmDto>('films', ref => ref.limit(this.defaultPageSize));
    filmsCollection.snapshotChanges().subscribe(res => {
      this.lastVisibleDoc = res[res.length - 1].payload.doc;
      this.firstVisibleDoc = res[0].payload.doc;
    });
    return filmsCollection.valueChanges().pipe(
      map(list => list.map(dto => this.filmMapper.fromDto(dto))),
    );
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
