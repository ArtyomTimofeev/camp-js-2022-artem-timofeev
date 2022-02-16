/**
 * Function that slices an array into chunks.
 * @param ids Ids of items collection.
 * @param size Size of portion to get items from db.
 * @returns 2D array sliced into chunks.
 */

export const getSlicedArrayOfIds = (ids: readonly number[], size: number): number[][] => {
  const slicedIdsArray: number[][] = [];
  for (let i = 0; i < Math.ceil(ids.length / size); i++) {
    slicedIdsArray[i] = ids.slice((i * size), (i * size) + size);
  }
  return slicedIdsArray;
};
