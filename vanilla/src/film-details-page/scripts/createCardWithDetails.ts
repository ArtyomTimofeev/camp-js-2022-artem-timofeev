import { Film } from './../../entities/models/film';

export const createCardWithDetails =
(detailsCard: HTMLElement | null, selectedFilm: Film, planetsNames: string, charactersNames: string): void => {
  if (!detailsCard) {
    return;
  }

  const filmDetailsFieldsHTML = `
  <h4><b>Title:</b> ${selectedFilm.title}</h4>
  <p><b>Release date:</b> ${selectedFilm.releaseDate.toLocaleDateString()}</p>
  <p><b>Description:</b> ${selectedFilm.openingCrawl}</p>
  <p><b>Producer:</b> ${selectedFilm.producer}</p>
  <p><b>Director:</b> ${selectedFilm.director}</p>
  <p><b>Episode №:</b> ${selectedFilm.episodeId}</p>
  <p><b>The planets on which the action took place:</b> ${planetsNames}</p>
  <p><b>Characters featured in the film:</b> ${charactersNames}</p>
  <button type="button" class="delete-film-btn mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
    Delete Card
  </button>
  `;
  detailsCard.innerHTML = filmDetailsFieldsHTML;
};
