import { DocumentData } from 'firebase/firestore';

export const getNamesOfCollectionItems = (collectionItems: DocumentData[]): string => {
  const collectionItemsNames = collectionItems.map(item => item.name);
  const collectionItemsNamesWithSpaces = collectionItemsNames.join(', ');
  return collectionItemsNamesWithSpaces;
};
