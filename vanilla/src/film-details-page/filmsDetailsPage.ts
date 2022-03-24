import { query, where } from 'firebase/firestore';

import { CHARACTERS_COLLECTION, FILMS_COLLECTION, PLANETS_COLLECTION } from '../utils/constants';
import { PlanetMappers } from '../entities/mappers/planetMappers';
import { CharacterMappers } from '../entities/mappers/charactersMappers';
import { FilmDocumentDTO } from '../entities/DTOs/filmDTO';
import { filmsList } from '../api/ListManager';
import { authService } from '../api/AuthService';

import { getCollectionDocs } from './scripts/getCollectionDocs';
import { getNamesOfCollectionItems } from './scripts/getNamesOfCollectionItems';
import { getCollectionRef } from './scripts/getCollectionRef';
import { createCardWithDetails } from './scripts/createCardWithDetails';

if (!authService.isUserAuthorized) {
  document.location = '/';
}

const detailsCard = document.querySelector<HTMLElement>('.details-card');

const params = new URLSearchParams(window.location.search);
const filmId = Number(params.get('id'));

if (!filmId) {
  document.location = '/';
}

const selectedFilmQuery = query(
  getCollectionRef<FilmDocumentDTO>(FILMS_COLLECTION),
  where('pk', '==', filmId),
);
const selectedFilm = await filmsList.getDocItem(selectedFilmQuery);

const planets = await getCollectionDocs(selectedFilm.planetsIds, PlanetMappers, PLANETS_COLLECTION);
const planetsNames = getNamesOfCollectionItems(planets);

const characters = await getCollectionDocs(selectedFilm.characterIds, CharacterMappers, CHARACTERS_COLLECTION);
const charactersNames = getNamesOfCollectionItems(characters);

createCardWithDetails(detailsCard, selectedFilm, planetsNames, charactersNames);

const deleteFilmBtn = document.querySelector<HTMLButtonElement>('.delete-film-btn');

deleteFilmBtn?.addEventListener('click', async() => {
  deleteFilmBtn.disabled = true;
    await filmsList.deleteItemOfCollection(selectedFilm.firebaseId);
    document.location = '/';
});
