import { LOGOUT_TEXT, LOGIN_TEXT } from './utils/constants';
import { login } from './auth/login';
import { createTable } from './table';
import { auth, getFilms } from './api/api';
import { logout } from './auth/logout';

const tableBody = document.querySelector('tbody');
const loginButton = document.querySelector('.login-button');
const sortingSelect = document.getElementById('sorting-select');

const filmsData = await getFilms();
createTable(tableBody, filmsData);

sortingSelect?.addEventListener('change', async event => {
  const selectElem = event.target as HTMLSelectElement;
  const filmsData1 = await getFilms(selectElem.value);
  createTable(tableBody, filmsData1);
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
