import { FilmsSortingType } from './entities/enums/filmSortingTypeEnum';
import { LOGOUT_TEXT, LOGIN_TEXT } from './utils/constants';
import { login } from './auth/login';
import { createTable } from './table';
import { auth, getFilms } from './api/api';
import { logout } from './auth/logout';

const tableBody = document.querySelector<HTMLTableElement>('tbody');
const loginButton = document.querySelector<HTMLButtonElement>('.login-button');
const sortingSelect = document.querySelector<HTMLSelectElement>('.sorting-select');

let filmsData = await getFilms();
createTable(tableBody, filmsData);

sortingSelect?.addEventListener('change', async event => {
  const selectedOptionElement = event.target as HTMLSelectElement;
  const optionElementValue = selectedOptionElement.value as FilmsSortingType;
  filmsData = await getFilms(optionElementValue);
  createTable(tableBody, filmsData);
});

let isAuth = false;
loginButton?.addEventListener('click', async() => {
  if (!isAuth) {
    isAuth = true;
    await login(auth);
    loginButton.textContent = LOGOUT_TEXT;
  } else {
    isAuth = false;
    await logout(auth);
    loginButton.textContent = LOGIN_TEXT;
  }
});
