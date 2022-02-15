import { DocumentData } from 'firebase/firestore';

/**
 * Function to get names of collection items.
 * @param collectionItems Items of collection array.
 * @returns Array with names of collection items.
 */
export const getNamesOfCollectionItems = (collectionItems: readonly DocumentData[]): string => {
  const collectionItemsNames = collectionItems.map(item => item.name);
  return collectionItemsNames.join(', ');
};
