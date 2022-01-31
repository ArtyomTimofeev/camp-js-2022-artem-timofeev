import { DocumentData } from 'firebase/firestore';

import { LOGOUT_TEXT, LOGIN_TEXT } from './utils/constants';
import { login } from './auth/login';
import { createTable } from './table';
import { auth, getFilms } from './api/api';
import { logout } from './auth/logout';

const tableBody = document.querySelector('tbody');
const loginButton = document.querySelector('.login-button');

const filmsData: DocumentData = await getFilms();
createTable(tableBody, filmsData);

let isAuth = false;
loginButton?.addEventListener('click', () => {
  if (!isAuth) {
    login(auth);
    loginButton.textContent = LOGOUT_TEXT;
    isAuth = true;
  } else {
    logout(auth);
    loginButton.textContent = LOGIN_TEXT;
    isAuth = false;
  }
  });
