import { DocumentData } from 'firebase/firestore';

import { authService } from './api/AuthService';
import { disableTableButtons } from './scripts/disablingTableButtons';
import { FilmsSortingType } from './entities/enums/filmSortingTypeEnum';
import { LOGOUT_TEXT, LOGIN_TEXT, FILMS_COLLECTION } from './utils/constants';
import { createTable } from './scripts/table';
import { auth, ListManager } from './api/ListManager';

const tableBody = document.querySelector<HTMLTableElement>('.films-table__body');
const loginButton = document.querySelector<HTMLButtonElement>('.login-button');
const sortingSelect = document.querySelector<HTMLSelectElement>('.sort-form__control');
const prevPageBtn = document.querySelector<HTMLButtonElement>('.films-form__prev-page-btn');
const nextPageBtn = document.querySelector<HTMLButtonElement>('.films-form__next-page-btn');

export const filmsList = new ListManager(FILMS_COLLECTION);
await filmsList.firstPage();

const createFilmsPage = (filmsData: DocumentData): void => {
  disableTableButtons(prevPageBtn, nextPageBtn);
  createTable(tableBody, filmsData);
};
createFilmsPage(filmsList.dataOfListItemsGetter);

sortingSelect?.addEventListener('change', async event => {
  const selectedOptionElement = event.target as HTMLSelectElement;
  const sortingType = selectedOptionElement.value as FilmsSortingType;
  await filmsList.firstPage(sortingType);
  createFilmsPage(filmsList.dataOfListItemsGetter);
});

nextPageBtn?.addEventListener('click', async() => {
  if (filmsList.currentPageNumberGetter < filmsList.numberOfPagesGetter) {
    nextPageBtn.disabled = true;
    await filmsList.nextPage();
    createFilmsPage(filmsList.dataOfListItemsGetter);
  }
});

prevPageBtn?.addEventListener('click', async() => {
  if (filmsList.currentPageNumberGetter !== 1) {
    prevPageBtn.disabled = true;
    await filmsList.prevPage();
    createFilmsPage(filmsList.dataOfListItemsGetter);
  }
});

loginButton?.addEventListener('click', async() => {
  if (!authService.isUserAuthorizedGetter) {
    await authService.login(auth);
    loginButton.textContent = LOGOUT_TEXT;
  } else {
    await authService.logout(auth);
    loginButton.textContent = LOGIN_TEXT;
  }
});
