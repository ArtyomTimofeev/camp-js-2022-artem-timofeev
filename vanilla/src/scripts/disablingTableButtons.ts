import { filmsList } from './../index';

export const disableTableButtons = (prevPageBtn: HTMLButtonElement | null, nextPageBtn: HTMLButtonElement | null): void => {

  /** Condition for typescript without logic for application to work. */
  if (!prevPageBtn || !nextPageBtn) {
    return;
  }

  if (filmsList.currentPageNumberGetter === 1) {
    prevPageBtn.disabled = true;
  } else {
    prevPageBtn.disabled = false;
  }

  if (filmsList.currentPageNumberGetter === filmsList.numberOfPagesGetter) {
    nextPageBtn.disabled = true;
  } else {
    nextPageBtn.disabled = false;
  }
};
