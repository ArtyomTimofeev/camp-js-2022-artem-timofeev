import { Injectable } from '@angular/core';
import { collection, Firestore, collectionData, doc, addDoc, docData, deleteDoc, updateDoc, CollectionReference, DocumentReference } from '@angular/fire/firestore';
import { defer, map, Observable } from 'rxjs';

import { FilmDTO } from './mappers/dto/film.dto';
import { filmMapper } from './mappers/film.mapper';
import { Film } from './models/film';

/**
 * Data service.
 */
@Injectable({
  providedIn: 'root',
})
export class DataService {

  private constructor(private readonly firestore: Firestore) {}

  /**
   * Function to get data of films collection.
   */
  public getFilms(): Observable<Film[]> {
    const filmsRef = collection(this.firestore, 'films') as CollectionReference<FilmDTO>;
    return collectionData(filmsRef, { idField: 'id' }).pipe(
      map(list => list.map(dto => filmMapper.fromDto(dto))),
    );
  }

  /**
   * Function to get film doc by id.
   * @param id - Doc id.
   */
  public getFilmById(id: string): Observable<Film> {
    const filmDocRef = doc(this.firestore, `films/${id}`) as DocumentReference<FilmDTO>;
    return docData(filmDocRef, { idField: 'id' }).pipe(
      map(filmDto => filmMapper.fromDto(filmDto)),
    );
  }

  /**
   * Function to add film doc to films collection.
   * @param film - Added film doc.
   */
  public addFilm(film: FilmDTO): Observable<string> {
    const filmsRef = collection(this.firestore, 'films') as CollectionReference<FilmDTO>;
    return defer(() => addDoc(filmsRef, film)).pipe(
      map(dto => dto.id),
    );
  }

  /**
   * Function to delete film doc from films collection.
   * @param film - Removable film doc.
   */
  public deleteFilm(id: string): Observable<void> {
    const filmDocRef = doc(this.firestore, `films/${id}`) as DocumentReference<FilmDTO>;
    return defer(() => deleteDoc(filmDocRef));
  }

  /**
   * Function to update film doc in films collection.
   * @param film - Updated film doc.
   */
  public updateFilm(film: Film): Observable<void> {
    const dto = filmMapper.toDto(film);
    const filmDocRef = doc(this.firestore, `films/${film.id}`);
    return defer(() => updateDoc(filmDocRef, { ...dto }));
  }
}
