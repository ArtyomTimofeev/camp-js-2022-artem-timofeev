import { FilmsSortingType } from './entities/enums/filmSortingTypeEnum';
import { LOGOUT_TEXT, LOGIN_TEXT } from './utils/constants';
import { login } from './auth/login';
import { createTable } from './table';
import { auth, fetchFilms } from './api/api';
import { logout } from './auth/logout';

const tableBody = document.querySelector<HTMLTableElement>('.films-table__body');
const loginButton = document.querySelector<HTMLButtonElement>('.login-button');
const sortingSelect = document.querySelector<HTMLSelectElement>('.sort-form__control');
const prevPageBtn = document.querySelector<HTMLButtonElement>('.films-form__prev-page-btn');
const nextPageBtn = document.querySelector<HTMLButtonElement>('.films-form__next-page-btn');

let filmsData = await fetchFilms.getFilms();
createTable(tableBody, filmsData);
console.log(fetchFilms.snapshotLength);
sortingSelect?.addEventListener('change', async event => {
  const selectedOptionElement = event.target as HTMLSelectElement;
  const optionElementValue = selectedOptionElement.value as FilmsSortingType;
  filmsData = await fetchFilms.getFilms(optionElementValue);
  createTable(tableBody, filmsData);
});

nextPageBtn?.addEventListener('click', async() => {
    if (fetchFilms.snapshotLength > 0) {
filmsData = await fetchFilms.nextPage();
}
    createTable(tableBody, filmsData);
});

prevPageBtn?.addEventListener('click', async() => {
  if (fetchFilms.lastVisible !== undefined) {
 filmsData = await fetchFilms.prevPage();
    createTable(tableBody, filmsData);
}

});

let isAuthorized = false;
loginButton?.addEventListener('click', async() => {
  if (!isAuthorized) {
    isAuthorized = true;
    await login(auth);
    loginButton.textContent = LOGOUT_TEXT;
  } else {
    isAuthorized = false;
    await logout(auth);
    loginButton.textContent = LOGIN_TEXT;
  }
});
