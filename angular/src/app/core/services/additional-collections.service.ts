import { combineLatest, map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { CHUNK_SIZE_OF_IDS } from '../utils/constants';

import { IMapper } from './mappers/mappers';

/**
 * Additional Collections Service.
 */
@Injectable({
  providedIn: 'root',
})
export class AdditionalCollectionsService {

  public constructor(
    private readonly angularFirestore: AngularFirestore,
  ) {}

  /**
   * Gets sliced ids array.
   * @param ids - Items ids.
   * @param size - Chunk size of ids.
   */
  private getSlicedArrayOfIds(ids: readonly number[], size: number): number[][] {
    const slicedIdsArray: number[][] = [];
    for (let i = 0; i < Math.ceil(ids.length / size); i++) {
      slicedIdsArray[i] = ids.slice((i * size), (i * size) + size);
    }
    return slicedIdsArray;
  }

  /**
   * Gets items from any collection related by ids.
   * @param ids - Items ids.
   * @param mapper - Mapper for items.
   * @param collectionName - Name of collection.
   */
  public getCollectionItems<TDto, TModel>(
    ids: readonly number[], mapper: IMapper<TDto, TModel>, collectionName: string,
  ): Observable<TModel[]> {
    const slicedIds = this.getSlicedArrayOfIds(ids, CHUNK_SIZE_OF_IDS);
    const allItems: Observable<TModel[]>[] = slicedIds.map(chunk =>
      this.angularFirestore.collection<TDto>(collectionName, ref => ref.where('pk', 'in', chunk))
        .snapshotChanges()
        .pipe(
          map(snapshot => snapshot.map(s => ({ ...s.payload.doc.data(), id: s.payload.doc.id }))),
          map(list => list.map(dto => mapper.fromDto(dto))),
        ));
    return combineLatest(allItems).pipe(
      map(entities => entities.flat()),
    );
  }

  /**
   * Gets all collection items.
   * @param collectionName - Name of collection.
   * @param mapper -  Mapper for items.
   */
  public getAllCollectionItems<TDto, TModel>(
    collectionName: string,
    mapper: IMapper<TDto, TModel>,
  ): Observable<TModel[]> {
    const itemsCollection = this.angularFirestore.collection<TDto>(collectionName);
    return itemsCollection.snapshotChanges()
      .pipe(
        map(snapshot => snapshot.map(s => s.payload.doc.data())),
        map(list => list.map(dto => mapper.fromDto(dto))),
      );
  }
}
