import { combineLatest, map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { IMapperFromDto } from './mappers/mappers';

/**
 *
 */
@Injectable({
  providedIn: 'root',
})
export class AdditionalCollectionsService {

  public constructor(
    private readonly afs: AngularFirestore,
  ) {}

  /**
   * @param ids =fd.
   * @param mapper -d.
   * @param collectionName - S.
   */
  public getCollectionItems<TDto, TModel>(
    ids: readonly number[], mapper: IMapperFromDto<TDto, TModel>, collectionName: string,
  ): Observable<TModel[]> {
    const slicedIds = this.getSlicedArrayOfIds(ids, 10);
    const allItems: Observable<TModel[]>[] = slicedIds.map(chunk =>
      this.afs.collection<TDto>(collectionName, ref => ref.where('pk', 'in', chunk))
        .snapshotChanges()
        .pipe(
          map(snapshot => snapshot.map(s => ({ ...s.payload.doc.data(), id: s.payload.doc.id }))),
          map(list => list.map(dto => mapper.fromDto(dto))),
        ));
    return combineLatest(allItems).pipe(
      map(entities => entities.flat()),
    );
  }

  private getSlicedArrayOfIds(ids: readonly number[], size: number): number[][] {
    const slicedIdsArray: number[][] = [];
    for (let i = 0; i < Math.ceil(ids.length / size); i++) {
      slicedIdsArray[i] = ids.slice((i * size), (i * size) + size);
    }
    return slicedIdsArray;
  }

  public getAllCollectionItems<TDto, TModel>(
    collectionName: string,
    mapper: IMapperFromDto<TDto, TModel>,
  ): Observable<TModel[]> {
    const itemsCollection = this.afs.collection<TDto>(collectionName);
    return itemsCollection.snapshotChanges()
      .pipe(
        map(snapshot => snapshot.map(s => s.payload.doc.data())),
        map(list => list.map(dto => mapper.fromDto(dto))),
      );
  }
}
