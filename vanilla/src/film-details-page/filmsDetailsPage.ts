import { collection, getDocs, query, where } from 'firebase/firestore';

import { FILMS_COLLECTION } from '../utils/constants';
import { planetMappers } from '../entities/mappers/planetMappers';
import { filmMapper } from '../entities/mappers/filmMapper';
import { db } from '../api/firebase-config';
import { Planet } from '../entities/models/planet';
import { Film } from '../entities/models/film';

import { getNamesOfCollectionItems } from './scripts/getNamesOfCollectionItems';
import { getSlicedArrayOfIds } from './scripts/getSlicedArrayOfIds';

const isUserAuthorized = JSON.parse(localStorage.isUserAuthorized);

if (!isUserAuthorized) {
  window.history.back();
}

const detailsCard = document.querySelector('.details-card');
const params = new URLSearchParams(window.location.search);
const filmId = Number(params.get('id'));

const getDocsItems = async(queryForDocs, mapper): Promise<any> => {
  const docSnap = await getDocs(queryForDocs);
  const docs = docSnap.docs.map(doc => doc.data());
  const filmDocs = docs.map(filmDocument => mapper.fromDto(filmDocument));
  return filmDocs;
};
const filmsQuery = query(collection(db, FILMS_COLLECTION), where('pk', '==', filmId));
let selectedFilm: Film = await getDocsItems(filmsQuery, filmMapper);
selectedFilm = selectedFilm[0];

const planetsQuery = query(collection(db, 'planets'), where('pk', 'in', selectedFilm.planetsIds));
const selectedPlanets: Planet[] = await getDocsItems(planetsQuery, planetMappers);
const planetsNames = getNamesOfCollectionItems(selectedPlanets);

// ====================================================================
const slicedCharacterIdsArr = getSlicedArrayOfIds([...selectedFilm.characterIds], 10);
const characters = [];
const querySnapshots: any = [];
for (let i = 0; i < slicedCharacterIdsArr.length; i++) {
  const charactersQuery = query(collection(db, 'people'), where('pk', 'in', slicedCharacterIdsArr[i]));
  const querySnapshot = getDocs(charactersQuery);
  querySnapshots.push(querySnapshot);
}
const snapshotPromises = await Promise.all(querySnapshots).then(res => res.map(doc => doc.data()));
console.log(querySnapshots);
const charactersNames = getNamesOfCollectionItems(characters);

const filmDetailsFieldsHTML = `
  <h4><b>Title:</b> ${selectedFilm.title}</h4>
  <p><b>Release date:</b> ${selectedFilm.releaseDate.toLocaleDateString()}</p>
  <p><b>Description:</b> ${selectedFilm.openingCrawl}</p>
  <p><b>Producer:</b> ${selectedFilm.producer}</p>
  <p><b>Director:</b> ${selectedFilm.director}</p>
  <p><b>Episode №:</b> ${selectedFilm.episodeId}</p>
  <p><b>The planets on which the action took place:</b> ${planetsNames}</p>
  <p><b>Characters featured in the film:</b> ${charactersNames}</p>
`;
detailsCard.innerHTML = filmDetailsFieldsHTML;
