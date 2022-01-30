import { createTable } from './table';
import { API } from './api/api';
import { state } from './state';

await API.getFilms().then((films) => {
  state.films = films;
});

const tableBody: any = document.querySelector('tbody');
createTable(tableBody);
