/**
 * Function to return isUserAuthorized flag from local storage.
 * @returns IsUserAuthorized flag from local storage.
 */

export const isUserAuthorized = (): boolean => JSON.parse(localStorage.isUserAuthorized);
