import { DocumentData } from 'firebase/firestore';

/**
 * Function for maping html elements for table.
 * @param tableBody - Body of table html selector.
 * @param filmsData - Data about films.
 */

export const createTable = (tableBody: HTMLElement | null, filmsData: DocumentData): void => {
  if (!tableBody) {
    return;
  }

  const tableRowsWithFilmDataHtmlArr = filmsData.map(
    film =>
      ` <tr class="table-rows-with-films">
          <td class="mdl-data-table__cell--non-numeric">
            <a href="/film-details-page/">
            ${film.title}
            </a>
          </td>
          <td>${film.episodeId}</td>
          <td>${film.producer}</td>
          <td>${film.releaseDate.toLocaleDateString()}</td>
        </tr>`,
  );
  tableBody.innerHTML = tableRowsWithFilmDataHtmlArr.join('');
};
