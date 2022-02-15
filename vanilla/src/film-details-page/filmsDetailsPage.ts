import { getDocs, query, where } from 'firebase/firestore';

import { CHARACTERS_COLLECTION, FILMS_COLLECTION, PLANETS_COLLECTION } from '../utils/constants';
import { planetMappers } from '../entities/mappers/planetMappers';
import { filmMapper } from '../entities/mappers/filmMapper';
import { characterMappers } from '../entities/mappers/charactersMappers';
import { FilmDocumentDTO } from '../entities/DTOs/filmDTO';
import { filmsList } from '../api/ListManager';
import { authService } from '../api/AuthService';

import { getCollectionDocs } from './scripts/getCollectionDocs';
import { getNamesOfCollectionItems } from './scripts/getNamesOfCollectionItems';
import { getCollectionRef } from './scripts/getCollectionRef';
import { createCardWithDetails } from './scripts/createCardWithDetails';

if (!authService.getIsUserAuthorized) {
  window.history.back();
}

const detailsCard = document.querySelector<HTMLElement>('.details-card');

const params = new URLSearchParams(window.location.search);
const filmId = Number(params.get('id'));

const selectedFilmQuery = query(
  getCollectionRef<FilmDocumentDTO>(FILMS_COLLECTION),
  where('pk', '==', filmId),
);
const docs = await getDocs(selectedFilmQuery);
const selectedFilm = filmMapper.fromDto({ ...docs.docs[0].data(), id: docs.docs[0].id });

const planets = await getCollectionDocs(selectedFilm.planetsIds, planetMappers, PLANETS_COLLECTION);
const planetsNames = getNamesOfCollectionItems(planets);

const characters = await getCollectionDocs(selectedFilm.characterIds, characterMappers, CHARACTERS_COLLECTION);
const charactersNames = getNamesOfCollectionItems(characters);

createCardWithDetails(detailsCard, selectedFilm, planetsNames, charactersNames);

const deleteFilmBtn = document.querySelector<HTMLButtonElement>('.delete-film-btn');
deleteFilmBtn?.addEventListener('click', async() => {
  deleteFilmBtn.disabled = true;
  await filmsList.deleteItemOfCollection(selectedFilm.uniqHashId);
  window.history.back();
});
