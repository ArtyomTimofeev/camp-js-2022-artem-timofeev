import { getAuth } from 'firebase/auth';

import { login } from './auth/login';
import { createTable } from './table';
import { API } from './api/api';
import { state } from './state';
import { logout } from './auth/logout';

await API.getFilms().then(films => {
  state.filmsData = films;
});

const tableBody: any = document.querySelector('tbody');
const loginButton: any = document.querySelector('.login-button');

createTable(tableBody);

loginButton.addEventListener('click', () => {
  const auth = getAuth();
  if (!state.isAuth) {
    login(loginButton, auth);
  }
  if (state.isAuth) {
    logout(loginButton, auth);
  }
  });
