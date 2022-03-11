import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { PLANETS_COLLECTION } from '../utils/constants';
import { Planet } from '../models/planet';

import { PlanetMapper } from './mappers/planet.mapper';
import { PlanetDto } from './mappers/dto/planet.dto';

/**
 *
 */
@Injectable({
  providedIn: 'root',
})
export class AdditionalCollectionsService {

  public constructor(private readonly afs: AngularFirestore, private readonly planetMapper: PlanetMapper) { }

  /**
   * @param ids =fd.
   */
  public getPlanets(ids: number[]): Observable<Planet[]> {
    const filmsCollection = this.afs.collection<PlanetDto>(PLANETS_COLLECTION, ref => ref.where('pk', 'in', ids));
    return filmsCollection.snapshotChanges().pipe(
      map(snapshot => snapshot.map(s => (s.payload.doc.data()))),
      map(list => list.map(dto => this.planetMapper.fromDto(dto))),
    );
  }

}
