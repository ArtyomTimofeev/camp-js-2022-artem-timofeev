export const getSlicedArrayOfIds = (ids: number[], size: number): number[][] => {
  const array = ids;
  const slicedArray: number[][] = [];
  for (let i = 0; i < Math.ceil(array.length / size); i++) {
    slicedArray[i] = array.slice((i * size), (i * size) + size);
  }
  return slicedArray;
};
