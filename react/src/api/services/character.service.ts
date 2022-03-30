import {
  collection, getDocs, query, where,
} from 'firebase/firestore/lite';
import { Character } from 'src/models/character';
import _ from 'lodash';
import { CHARACTERS_COLLECTION_NAME, CHUNK_SIZE_OF_IDS } from 'src/utils/constants';
import { CharacterDto } from '../dtos/character.dto';
import { characterMapper } from '../mappers/characer.mapper';
import { Film } from '../../models/film';
import { FirebaseService } from './firebase.service';

export namespace CharacterService {

  export const fetchRelatedCharacters = async (
    ids: Film['charactersIds'],
  ): Promise<Character[]> => {
    const slicedIds = _.chunk(ids, CHUNK_SIZE_OF_IDS);
    const queryPromises = slicedIds.map(chunk => {
      const queryForCharacters = query(
        collection(FirebaseService.db, CHARACTERS_COLLECTION_NAME),
        where('pk', 'in', chunk),
      );
      return getDocs(queryForCharacters);
    });
    const snapshotPromises = await Promise.all(queryPromises);
    const docs = snapshotPromises.map(item => item.docs.map(doc => ({ ...doc.data() as CharacterDto, id: doc.id })));
    return docs.flatMap(items => items.map(dto => characterMapper.fromDto(dto)));
  };

  export const fetchAllCharacters = async (): Promise<Character[]> => {
    const queryForCharacters = query(
      collection(FirebaseService.db, CHARACTERS_COLLECTION_NAME),
    );
    const charactersSnapshot = await getDocs(queryForCharacters);
    return charactersSnapshot.docs
      .map(doc => ({ ...doc.data() as CharacterDto }))
      .map(dto => characterMapper.fromDto(dto));
  };
}
