import { combineLatest, map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Planet } from './../models/planet';
import { CharacterDto } from './mappers/dto/character.dto';
import { Character } from './../models/character';
import { PlanetDto } from './mappers/dto/planet.dto';
import { CHUNK_SIZE_OF_IDS, PLANETS_COLLECTION, CHARACTERS_COLLECTION } from './../utils/constants';
import { PlanetMapper } from './mappers/planet.mapper';
import { CharacterMapper } from './mappers/character.mapper';
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
    private readonly planetMapper: PlanetMapper,
    private readonly characterMapper: CharacterMapper,
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
  private getCollectionItems<TDto, TModel>(
    ids: readonly number[], mapper: IMapper<TDto, TModel>, collectionName: string,
  ): Observable<TModel[]> {
    const slicedIds = this.getSlicedArrayOfIds(ids, CHUNK_SIZE_OF_IDS);
    const allItems = slicedIds.map(chunk =>
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
  private getAllCollectionItems<TDto, TModel>(
    mapper: IMapper<TDto, TModel>,
    collectionName: string,
  ): Observable<TModel[]> {
    const itemsCollection = this.angularFirestore.collection<TDto>(collectionName);
    return itemsCollection.snapshotChanges()
      .pipe(
        map(snapshot => snapshot.map(s => s.payload.doc.data())),
        map(list => list.map(dto => mapper.fromDto(dto))),
      );
  }

  /**
   * Gets related planets.
   * @param ids - Planets ids.
   */
  public getRelatedPlanets(ids: readonly number[]): Observable<Planet[]> {
    return this.getCollectionItems<PlanetDto, Planet>(ids, this.planetMapper, PLANETS_COLLECTION);
  }

  /**
   * Gets related characters.
   * @param ids - Characters ids.
   */
  public getRelatedCharacters(ids: readonly number[]): Observable<Character[]> {
    return this.getCollectionItems<CharacterDto, Character>(ids, this.characterMapper, CHARACTERS_COLLECTION);
  }

  /**
   * Gets all planets.
   */
  public getAllPlanets(): Observable<Planet[]> {
    return this.getAllCollectionItems<PlanetDto, Planet>(this.planetMapper, PLANETS_COLLECTION);
  }

  /**
   * Gets all characters.
   */
  public getAllCharacters(): Observable<Character[]> {
    return this.getAllCollectionItems<CharacterDto, Character>(this.characterMapper, CHARACTERS_COLLECTION);
  }
}
