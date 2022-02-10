export const getSlicedArrayOfIds = (ids: readonly number[], size: number): number[][] => {
  const idsArray = ids;
  const slicedIdsArray: number[][] = [];
  for (let i = 0; i < Math.ceil(idsArray.length / size); i++) {
    slicedIdsArray[i] = idsArray.slice((i * size), (i * size) + size);
  }
  return slicedIdsArray;
};
