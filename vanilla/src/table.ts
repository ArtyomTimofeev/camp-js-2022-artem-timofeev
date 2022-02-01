import { DocumentData } from 'firebase/firestore';

/**
 * Function for maping html elements for table.
 * @param tableBody - Body of table html selector.
 * @param filmsData - Data about films.
 */

export const createTable = (tableBody, filmsData: DocumentData): void => {
  const tableRowsWithFilmDataHtmlArr = filmsData.map(
    (film: DocumentData) =>
      ` <tr class="table-rows-with-films">
          <td class="mdl-data-table__cell--non-numeric">${film.fields.title}</td>
          <td>${film.fields.episode_id}</td>
          <td>${film.fields.producer}</td>
          <td>${film.fields.release_date}</td>
        </tr>`,
  );
  tableBody.innerHTML = tableRowsWithFilmDataHtmlArr.join('');
};
