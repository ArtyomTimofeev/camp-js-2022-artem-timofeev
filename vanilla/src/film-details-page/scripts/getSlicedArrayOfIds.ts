export const getSlicedArrayOfIds = (ids: readonly number[], size: number): number[][] => {
  const slicedIdsArray: number[][] = [];
  for (let i = 0; i < Math.ceil(ids.length / size); i++) {
    slicedIdsArray[i] = ids.slice((i * size), (i * size) + size);
  }
  return slicedIdsArray;
};
