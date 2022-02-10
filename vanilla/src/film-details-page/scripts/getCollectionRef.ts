import { collection, CollectionReference } from 'firebase/firestore';

import { db } from './../../api/firebase-config';

/**
 * Function.
 * @param name
 * @returns
 */
export function getCollectionRef<TDto>(name: string): CollectionReference<TDto> {
  return collection(db, name) as CollectionReference<TDto>;
}
