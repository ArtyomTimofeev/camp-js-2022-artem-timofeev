import { fetchFilms } from '../api/fetchingFilms';

export const disableTableButtons = (prevPageBtn: HTMLButtonElement | null, nextPageBtn: HTMLButtonElement | null): void => {

  if (!prevPageBtn || !nextPageBtn) {
    return;
  }

  if (fetchFilms.currentPageNumber === 1) {
    prevPageBtn.disabled = true;
  } else {
    prevPageBtn.disabled = false;
  }

  if (fetchFilms.currentPageNumber === fetchFilms.numberOfPages) {
    nextPageBtn.disabled = true;
  } else {
    nextPageBtn.disabled = false;
  }
};
