import { DocumentData } from 'firebase/firestore';

export const getNamesOfCollectionItems = (collectionItems: DocumentData[]): string => {
  const collectionItemsNames: string[] = [];
  for (const collectionItem of collectionItems) {
    collectionItemsNames.push(collectionItem.name);
  }
  const collectionItemsNamesWithSpaces = collectionItemsNames.join(', ');
  return collectionItemsNamesWithSpaces;
};
