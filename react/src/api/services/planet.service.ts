import {
  collection, getDocs, query, where,
} from 'firebase/firestore/lite';
import _ from 'lodash';
import { Film } from '../../models/film';
import { planetMapper } from '../mappers/planet.mapper';
import { PlanetDto } from '../dtos/planet.dto';
import { Planet } from '../../models/planet';
import { FirebaseService } from './firebase.service';

export namespace PlanetService {
  export const fetchRelatedPlanets = async (
    ids: Film['planetsIds'],
  ): Promise<Planet[]> => {
    const slicedIdsArray = _.chunk(ids, 10);
    const queryPromises = slicedIdsArray.map(chunk => {
      const queryForPlanets = query(
        collection(FirebaseService.db, 'planets'),
        where('pk', 'in', chunk),
      );
      return getDocs(queryForPlanets);
    });
    const snapshotPromises = await Promise.all(queryPromises);
    const docs = snapshotPromises.map(item => item.docs.map(doc => ({ ...doc.data() as PlanetDto, id: doc.id })));
    return docs.flatMap(items => items.map(dto => planetMapper.fromDto(dto)));
  };
}
