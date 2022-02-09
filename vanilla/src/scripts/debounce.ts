/**
 * 
 * @param callback function which
 * @param delay 
 * @returns 
 */
export const debounce = (callback: Function, delay: number = 1000): Function => {
  let timeoutId: number | null = null;

  return (...args: any) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(async() => {
      await callback(...args)
      return;
    }, delay)
  }
}