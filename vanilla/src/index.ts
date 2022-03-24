import { fillLoginBtn } from './scripts/fillLoginBtn';
import { debounce } from './utils/debounce';
import { Film } from './entities/models/film';
import { authService } from './api/AuthService';
import { disableTableButtons } from './scripts/disablingTableButtons';
import { FilmsSortingType } from './entities/enums/filmSortingTypeEnum';
import { createTable } from './scripts/table';
import { filmsList } from './api/ListManager';
import { auth } from './api/firebase-config';

const tableBody = document.querySelector<HTMLTableElement>('.films-table__body');
const loginButton = document.querySelector<HTMLButtonElement>('.login-button');
const sortingSelect = document.querySelector<HTMLSelectElement>('.sort-form__control');
const prevPageBtn = document.querySelector<HTMLButtonElement>('.films-form__prev-page-btn');
const nextPageBtn = document.querySelector<HTMLButtonElement>('.films-form__next-page-btn');
const titleSearchingInput = document.querySelector<HTMLInputElement>('.title-searching-input');

await filmsList.firstPage();
fillLoginBtn(loginButton);

if (sortingSelect) {
  sortingSelect.selectedIndex = 0;
}

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
  if (!authService.isUserAuthorized) {
    await authService.login(auth);
    fillLoginBtn(loginButton);
  } else {
    await authService.logout(auth);
    fillLoginBtn(loginButton);
  }
});

const createFilmsPageOnSearch = debounce(async(titleSubstring: string) => {
  filmsList.searchString = titleSubstring.trim();

  if (titleSubstring.trim() !== '') {
    if (sortingSelect !== null) {
      sortingSelect.disabled = true;
      sortingSelect.value = FilmsSortingType.Title;
      filmsList.sortingType = FilmsSortingType.Title;
    }
  } else if (sortingSelect !== null) {
      sortingSelect.disabled = false;
    }
  await filmsList.firstPage();
  createFilmsPage(filmsList.dataOfListItems);
});

titleSearchingInput?.addEventListener('input', () => {
  createFilmsPageOnSearch(titleSearchingInput.value);
});
