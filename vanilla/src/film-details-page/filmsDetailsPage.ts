import { getDocs, query, where } from 'firebase/firestore';

import { CHARACTERS_COLLECTION, FILMS_COLLECTION, PLANETS_COLLECTION } from '../utils/constants';
import { planetMappers } from '../entities/mappers/planetMappers';
import { filmMapper } from '../entities/mappers/filmMapper';
import { createCardWithDetails } from '../scripts/createCardWithDetails';
import { characterMappers } from '../entities/mappers/charactersMappers';
import { FilmDocumentDTO } from '../entities/DTOs/filmDTO';

import { getCollectionDocs } from './scripts/getCollectionDocs';
import { getNamesOfCollectionItems } from './scripts/getNamesOfCollectionItems';
import { getCollectionRef } from './scripts/getCollectionRef';

const isUserAuthorized = JSON.parse(localStorage.isUserAuthorized);
if (!isUserAuthorized) {
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
const selectedFilm = filmMapper.fromDto(docs.docs[0].data());

const planets = await getCollectionDocs(selectedFilm.planetsIds, planetMappers, PLANETS_COLLECTION);
const planetsNames = getNamesOfCollectionItems(planets);

const characters = await getCollectionDocs(selectedFilm.characterIds, characterMappers, CHARACTERS_COLLECTION);
const charactersNames = getNamesOfCollectionItems(characters);

createCardWithDetails(detailsCard, selectedFilm, planetsNames, charactersNames);
