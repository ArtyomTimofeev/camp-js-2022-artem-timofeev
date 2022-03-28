import {
  collection, getDocs, query, where,
} from 'firebase/firestore/lite';
import { Character } from 'src/models/character';
import _ from 'lodash';
import { CharacterDto } from '../dtos/character.dto';
import { characterMapper } from '../mappers/characer.mapper';
import { Film } from '../../models/film';
import { FirebaseService } from './firebase.service';

export namespace CharacterService {

  export const fetchRelatedCharacters = async (
    ids: Film['charactersIds'],
  ): Promise<Character[]> => {
    const slicedIds = _.chunk(ids, 10);
    const queryPromises = slicedIds.map(chunk => {
      const queryForCharacters = query(
        collection(FirebaseService.db, 'people'),
        where('pk', 'in', chunk),
      );
      return getDocs(queryForCharacters);
    });
    const snapshotPromises = await Promise.all(queryPromises);
    const docs = snapshotPromises.map(item => item.docs.map(doc => ({ ...doc.data() as CharacterDto, id: doc.id })));
    return docs.flatMap(items => items.map(dto => characterMapper.fromDto(dto)));
  };
}
