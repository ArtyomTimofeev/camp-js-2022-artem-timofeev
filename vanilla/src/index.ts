import { Film } from './entities/models/film';
import { authorization } from './api/authorization';
import { disableTableButtons } from './scripts/disablingTableButtons';
import { FilmsSortingType } from './entities/enums/filmSortingTypeEnum';
import { LOGOUT_TEXT, LOGIN_TEXT } from './utils/constants';
import { createTable } from './scripts/table';
import { auth, fetchFilms } from './api/fetchingFilms';

const tableBody = document.querySelector<HTMLTableElement>('.films-table__body');
const loginButton = document.querySelector<HTMLButtonElement>('.login-button');
const sortingSelect = document.querySelector<HTMLSelectElement>('.sort-form__control');
const prevPageBtn = document.querySelector<HTMLButtonElement>('.films-form__prev-page-btn');
const nextPageBtn = document.querySelector<HTMLButtonElement>('.films-form__next-page-btn');

await fetchFilms.getFilmsData();

const createFilmsPage = (filmsData: Film[]): void => {
  disableTableButtons(prevPageBtn, nextPageBtn);
  createTable(tableBody, filmsData);
};
createFilmsPage(fetchFilms.filmsData);

sortingSelect?.addEventListener('change', async event => {
  const selectedOptionElement = event.target as HTMLSelectElement;
  const sortingType = selectedOptionElement.value as FilmsSortingType;
  await fetchFilms.getFilmsData(sortingType);
  createFilmsPage(fetchFilms.filmsData);
});

nextPageBtn?.addEventListener('click', async() => {
  if (fetchFilms.currentPageNumber < fetchFilms.numberOfPages) {
    await fetchFilms.nextPage();
    createFilmsPage(fetchFilms.filmsData);
  }
});

prevPageBtn?.addEventListener('click', async() => {
  if (fetchFilms.currentPageNumber !== 1) {
    await fetchFilms.prevPage();
    createFilmsPage(fetchFilms.filmsData);
  }
});

loginButton?.addEventListener('click', async() => {
  if (!authorization.isUserAuthorized) {
    await authorization.login(auth);
    loginButton.textContent = LOGOUT_TEXT;
  } else {
    await authorization.logout(auth);
    loginButton.textContent = LOGIN_TEXT;
  }
});
