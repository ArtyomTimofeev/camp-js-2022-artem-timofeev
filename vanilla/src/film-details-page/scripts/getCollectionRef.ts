import { collection, CollectionReference } from 'firebase/firestore';

import { db } from './../../api/firebase-config';

/**
 * Function returning collection ref.
 * @param collectionName - Name of collection.
 * @returns Collection ref.
 */
export function getCollectionRef<TDto>(collectionName: string): CollectionReference<TDto> {
  return collection(db, collectionName) as CollectionReference<TDto>;
}
