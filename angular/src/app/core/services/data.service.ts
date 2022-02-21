import { Injectable } from '@angular/core';
import { collection, Firestore, collectionData, doc, addDoc, docData, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { Observable } from 'rxjs';

import { FilmDTO } from './mappers/dto/film.dto';

/**
 * Data service.
 */
@Injectable({
  providedIn: 'root',
})
export class DataService {

  private constructor(private firestore: Firestore) { }

  /**
   * Function to get data of films collection.
   */
  public getFilms(): Observable<FilmDTO[]> {
    const filmsRef = collection(this.firestore, 'films');
    return collectionData(filmsRef, { idField: 'id' }) as Observable<FilmDTO[]>;
  }

  /**
   * Function to get film doc by id.
   * @param id - Doc id.
   */
  public getFilmById(id: string): Observable<FilmDTO[]> {
    const filmDocRef = doc(this.firestore, `films/${id}`);
    return docData(filmDocRef, { idField: 'id' }) as Observable<FilmDTO[]>;
  }

  /**
   * Function to add film doc to films collection.
   * @param film - Added film doc.
   */
  public addFilm(film: FilmDTO): Promise<DocumentData> {
    const filmsRef = collection(this.firestore, 'films');
    return addDoc(filmsRef, film);
  }

  /**
   * Function to delete film doc from films collection.
   * @param film - Removable film doc.
   */
  public deleteFilm(film: FilmDTO): Promise<void> {
    const filmDocRef = doc(this.firestore, `films/${film.id}`);
    return deleteDoc(filmDocRef);
  }

  /**
   * Function to update film doc in films collection.
   * @param film - Updated film doc.
   */
  public updateFilm(film: FilmDTO): Promise<void> {
    const filmDocRef = doc(this.firestore, `films/${film.id}`);
    return updateDoc(filmDocRef, {/** Todo.*/});
  }
}
