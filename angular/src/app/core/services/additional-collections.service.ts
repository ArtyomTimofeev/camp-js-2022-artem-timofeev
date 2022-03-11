import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { PLANETS_COLLECTION } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class AdditionalCollectionsService {

  public constructor(private readonly afs: AngularFirestore) { }

  public getCharacters(asd: any): Observable<any> {
    const filmsCollection = this.afs.collection<any>(PLANETS_COLLECTION, ref => ref.where('pk', 'in', asd));
    return filmsCollection.snapshotChanges().pipe(map(snapshot => snapshot.map(s => (s.payload.doc.data()))));
  }

}
