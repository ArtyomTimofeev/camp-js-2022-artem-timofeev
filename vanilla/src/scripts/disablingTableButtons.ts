import { filmsList } from './../api/ListManager';

export const disableTableButtons = (prevPageBtn: HTMLButtonElement | null, nextPageBtn: HTMLButtonElement | null): void => {

  /** Condition for typescript without logic for application to work. */
  if (!prevPageBtn || !nextPageBtn) {
    return;
  }

  if (filmsList.currentPageNumber === 1) {
    prevPageBtn.disabled = true;
  } else {
    prevPageBtn.disabled = false;
  }

  if (filmsList.currentPageNumber === filmsList.numberOfPages) {
    nextPageBtn.disabled = true;
  } else {
    nextPageBtn.disabled = false;
  }
};
