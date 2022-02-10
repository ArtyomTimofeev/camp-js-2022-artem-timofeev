import { where, getDocs, query } from 'firebase/firestore';

import { IMapperFromDto } from '../../entities/mappers/filmMapper';

import { getSlicedArrayOfIds } from './getSlicedArrayOfIds';
import { getCollectionRef } from './getCollectionRef';

export const getCollectionDocs = async<TDto, TModel>(ids: readonly number[], mapper: IMapperFromDto<TDto, TModel>, collectionName: string):
  Promise<TModel[]> => {
  const slicedIdsArr = getSlicedArrayOfIds(ids, 10);
  const queryPromises = slicedIdsArr.map(chunk => {
    const itemsQuery = query(
      getCollectionRef<TDto>(collectionName),
      where('pk', 'in', chunk),
    );
    return getDocs(itemsQuery);
  });
  const snapshotPromises = await Promise.all(queryPromises);
  const docs = snapshotPromises.map(item => item.docs.map(doc => doc.data()));
  const flatArray = docs.flatMap(items => items.map(dto => mapper.fromDto(dto)));
  return flatArray;
};
