/**
 * Function for delaying the execution of the callback and redelaying it if it was called before previous timer expired.
 * @param callback - Function which should be delayed.
 * @param delay - Miliseconds of delay.
 * @returns Function which executes callback and redelay it.
 */
export function debounce<Params extends any[]>(callback: (...args: Params) => unknown, delay = 1000): Function {
  let timeoutId: number | null = null;

  return (...args: Params) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(async() => {
      await callback(...args);
    }, delay);
  };
}
