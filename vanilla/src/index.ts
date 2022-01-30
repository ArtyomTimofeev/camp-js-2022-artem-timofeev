import { login } from './auth/login';
import { createTable } from './table';
import { API, auth } from './api/api';
import { state } from './state';
import { logout } from './auth/logout';

state.filmsData = await API.getFilms();

const tableBody: any = document.querySelector('tbody');
const loginButton: any = document.querySelector('.login-button');

createTable(tableBody);

loginButton.addEventListener('click', () => {
  if (!state.isAuth) {
    login(loginButton, auth);
  }
  if (state.isAuth) {
    logout(loginButton, auth);
  }
  });
