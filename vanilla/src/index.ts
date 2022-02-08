import { Film } from './entities/models/film';
import { authService } from './api/AuthService';
import { disableTableButtons } from './scripts/disablingTableButtons';
import { FilmsSortingType } from './entities/enums/filmSortingTypeEnum';
import { LOGOUT_TEXT, LOGIN_TEXT } from './utils/constants';
import { createTable } from './scripts/table';
import { auth, filmsList } from './api/ListManager';

const tableBody = document.querySelector<HTMLTableElement>('.films-table__body');
const loginButton = document.querySelector<HTMLButtonElement>('.login-button');
const sortingSelect = document.querySelector<HTMLSelectElement>('.sort-form__control');
const prevPageBtn = document.querySelector<HTMLButtonElement>('.films-form__prev-page-btn');
const nextPageBtn = document.querySelector<HTMLButtonElement>('.films-form__next-page-btn');

await filmsList.firstPage();

const createFilmsPage = (filmsData: Film[]): void => {
  disableTableButtons(prevPageBtn, nextPageBtn);
  createTable(tableBody, filmsData);
};
createFilmsPage(filmsList.dataOfListItems);

sortingSelect?.addEventListener('change', async event => {
  const selectedOptionElement = event.target as HTMLSelectElement;
  const sortingType = selectedOptionElement.value as FilmsSortingType;
  await filmsList.firstPage(sortingType);
  createFilmsPage(filmsList.dataOfListItems);
});

nextPageBtn?.addEventListener('click', async() => {
  if (filmsList.currentPageNumber < filmsList.numberOfPages) {
    nextPageBtn.disabled = true;
    await filmsList.nextPage();
    createFilmsPage(filmsList.dataOfListItems);
  }
});

prevPageBtn?.addEventListener('click', async() => {
  if (filmsList.currentPageNumber !== 1) {
    prevPageBtn.disabled = true;
    await filmsList.prevPage();
    createFilmsPage(filmsList.dataOfListItems);
  }
});

loginButton?.addEventListener('click', async() => {
  if (!authService.isUserAuthorize) {
    await authService.login(auth);
    loginButton.textContent = LOGOUT_TEXT;
  } else {
    await authService.logout(auth);
    loginButton.textContent = LOGIN_TEXT;
  }
});
