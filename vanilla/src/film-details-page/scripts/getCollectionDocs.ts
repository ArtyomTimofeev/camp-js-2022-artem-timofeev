import { where, getDocs, query } from 'firebase/firestore';

import { IMapperFromDto } from '../../entities/mappers/filmMapper';
import { PORTION_SIZE } from '../../utils/constants';

import { getSlicedArrayOfIds } from './getSlicedArrayOfIds';
import { getCollectionRef } from './getCollectionRef';

/**
 * Function to get flat array with any number of collection elements.
 * @param ids Identifiers corresponding to the elements of the collection.
 * @param mapper Mapper corresponding type of collection.
 * @param collectionName Name of collection.
 * @returns Flat array with collection items.
 */
export const getCollectionDocs = async<TDto, TModel>(ids: readonly number[], mapper: IMapperFromDto<TDto, TModel>, collectionName: string):
  Promise<TModel[]> => {
  const slicedIdsArr = getSlicedArrayOfIds(ids, PORTION_SIZE);
  const queryPromises = slicedIdsArr.map(chunk => {
    const itemsQuery = query(
      getCollectionRef<TDto>(collectionName),
      where('pk', 'in', chunk),
    );
    return getDocs(itemsQuery);
  });
  const snapshotPromises = await Promise.all(queryPromises);
  const docs = snapshotPromises.map(item => item.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  return docs.flatMap(items => items.map(dto => mapper.fromDto(dto)));
};
