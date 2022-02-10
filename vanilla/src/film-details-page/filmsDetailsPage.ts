import { collection, getDocs, query, where, CollectionReference } from 'firebase/firestore';
import _ from 'underscore';

import { CHARACTERS_COLLECTION, FILMS_COLLECTION, PLANETS_COLLECTION } from '../utils/constants';
import { planetMappers } from '../entities/mappers/planetMappers';
import { filmMapper, IMapperFromDto } from '../entities/mappers/filmMapper';
import { db } from '../api/firebase-config';
import { createCardWithDetails } from '../scripts/createCardWithDetails';
import { characterMappers } from '../entities/mappers/charactersMappers';
import { FilmDocumentDTO } from '../entities/DTOs/filmDTO';

import { getNamesOfCollectionItems } from './scripts/getNamesOfCollectionItems';
import { getSlicedArrayOfIds } from './scripts/getSlicedArrayOfIds';

const isUserAuthorized = JSON.parse(localStorage.isUserAuthorized);

if (!isUserAuthorized) {
  window.history.back();
}

function getCollectionRef<TDto>(name: string): CollectionReference<TDto> {
  return collection(db, name) as CollectionReference<TDto>;
}

const detailsCard = document.querySelector<HTMLElement>('.details-card');
const params = new URLSearchParams(window.location.search);
const filmId = Number(params.get('id'));

const getDocsItems = async<TDto, TModel>(ids: readonly number[], mapper: IMapperFromDto<TDto, TModel>, collectionName):
 Promise<TModel[]> => {
  const slicedCharacterIdsArr = getSlicedArrayOfIds(ids, 10);
  const queryPromises = slicedCharacterIdsArr.map(chunk => {
    const charactersQuery = query(
      getCollectionRef<TDto>(collectionName),
      where('pk', 'in', chunk),
    );
    return getDocs(charactersQuery);
  });
  const snapshotPromises = await Promise.all(queryPromises);

  const characters = snapshotPromises.map(item => item.docs.map(doc => doc.data()));
  const flatArray = characters.flatMap(items => items.map(dto => mapper.fromDto(dto)));

  return flatArray;
};

const filmsQuery = query(
  getCollectionRef<FilmDocumentDTO>(FILMS_COLLECTION),
  where('pk', '==', filmId),
);
const docs = await getDocs(filmsQuery);
const selectedFilm = filmMapper.fromDto(docs.docs[0].data());

const selectedPlanets = await getDocsItems(selectedFilm.planetsIds, planetMappers, PLANETS_COLLECTION);
const planetsNames = getNamesOfCollectionItems(selectedPlanets);

const characters = await getDocsItems(selectedFilm.characterIds, characterMappers, CHARACTERS_COLLECTION);
const charactersNames = getNamesOfCollectionItems(characters);

createCardWithDetails(detailsCard, selectedFilm, planetsNames, charactersNames);
