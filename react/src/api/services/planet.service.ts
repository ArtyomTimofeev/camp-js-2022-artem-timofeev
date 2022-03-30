import {
  collection, getDocs, query, where,
} from 'firebase/firestore/lite';
import _ from 'lodash';
import { CHUNK_SIZE_OF_IDS, PLANETS_COLLECTION_NAME } from 'src/utils/constants';
import { Film } from '../../models/film';
import { planetMapper } from '../mappers/planet.mapper';
import { PlanetDto } from '../dtos/planet.dto';
import { Planet } from '../../models/planet';
import { FirebaseService } from './firebase.service';

export namespace PlanetService {
  export const fetchRelatedPlanets = async (
    ids: Film['planetsIds'],
  ): Promise<Planet[]> => {
    const slicedIdsArray = _.chunk(ids, CHUNK_SIZE_OF_IDS);
    const queryPromises = slicedIdsArray.map(chunk => {
      const queryForPlanets = query(
        collection(FirebaseService.db, PLANETS_COLLECTION_NAME),
        where('pk', 'in', chunk),
      );
      return getDocs(queryForPlanets);
    });
    const snapshotPromises = await Promise.all(queryPromises);
    const docs = snapshotPromises.map(item => item.docs.map(doc => ({ ...doc.data() as PlanetDto, id: doc.id })));
    return docs.flatMap(items => items.map(dto => planetMapper.fromDto(dto)));
  };

  export const fetchAllPlanets = async (): Promise<Planet[]> => {
    const queryForPlanets = query(
      collection(FirebaseService.db, PLANETS_COLLECTION_NAME),
    );
    const planetsSnapshot = await getDocs(queryForPlanets);
    return planetsSnapshot.docs
      .map(doc => ({ ...doc.data() as PlanetDto, id: doc.id }))
      .map(dto => planetMapper.fromDto(dto));
  };

}
