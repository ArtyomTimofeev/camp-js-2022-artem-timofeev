import { collection, getDocs, query, where } from 'firebase/firestore';

import { FILMS_COLLECTION } from '../utils/constants';
import { planetMappers } from '../entities/mappers/planetMappers';
import { filmMapper } from '../entities/mappers/filmMapper';
import { FilmDocumentDTO } from '../entities/DTOs/filmDTO';
import { db } from '../api/firebase-config';
import { Planet } from '../entities/models/planet';
import { Film } from '../entities/models/film';
import { Character } from '../entities/models/character';
import { characterMappers } from '../entities/mappers/charactersMappers';

const isUserAuthorized = JSON.parse(localStorage.isUserAuthorized);

if (!isUserAuthorized) {
  window.history.back();
}

const detailsCard = document.querySelector('.details-card');
const params = new URLSearchParams(window.location.search);
const filmId = Number(params.get('id'));

const getDocsItems = async(queryForDocs, mapper): Promise<any> => {
  const docSnap = await getDocs(queryForDocs);
  const docs = docSnap.docs.map(doc => doc.data() as FilmDocumentDTO);
  const filmDocs = docs.map(filmDocument => mapper.fromDto(filmDocument));
  return filmDocs;
};
const filmsQuery = query(collection(db, FILMS_COLLECTION), where('pk', '==', filmId));
let selectedFilm: Film = await getDocsItems(filmsQuery, filmMapper);
selectedFilm = selectedFilm[0];

const planetsQuery = query(collection(db, 'planets'), where('pk', 'in', selectedFilm.planetsIds));
const selectedPlanets: Planet[] = await getDocsItems(planetsQuery, planetMappers);

const charactersQuery = query(collection(db, 'peoples'), where('pk', 'in', selectedFilm.characterIds));
const selectedCharacters: Character[] = await getDocsItems(charactersQuery, characterMappers);

const planetsNames = [];
for (const planet of selectedPlanets) {
  planetsNames.push(planet.name);
}
const characters = [];
for (const character of selectedCharacters) {
  characters.push(character.name);
}

const html = `
<h4><b>Title:</b> ${selectedFilm.title}</h4>
  <p><b>Release date:</b> ${selectedFilm.releaseDate.toLocaleDateString()}</p>
  <p><b>Description:</b> ${selectedFilm.openingCrawl}</p>
  <p><b>Producer:</b> ${selectedFilm.producer}</p>
  <p><b>Director:</b> ${selectedFilm.director}</p>
  <p><b>Episode №</b> ${selectedFilm.episodeId}</p>
  <p><b>The planets on which the action took place:</b>${planetsNames}</p>
`;
detailsCard.innerHTML = html;
console.log(planetsNames);
