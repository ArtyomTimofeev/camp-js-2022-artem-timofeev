import { collection, Firestore, getDocs, query, where } from 'firebase/firestore';

import { FILMS_COLLECTION } from '../utils/constants';

import { FilmDocumentDTO } from './../entities/DTOs/filmDTO';

import { filmMapper } from './../entities/mappers/filmMapper';

import { db } from './../api/firebase-config';

const isUserAuthorized = JSON.parse(localStorage.isUserAuthorized);

if (!isUserAuthorized) {
  window.history.back();
}

const detailsCard = document.querySelector('.details-card');
const params = new URLSearchParams(window.location.search);
const filmId = Number(params.get('id'));

const docRef = collection(db, FILMS_COLLECTION);
const q = query(docRef, where('pk', '==', filmId));
const docSnap = await getDocs(q);

const planetsRef = collection(db, 'planets');
const q = query(planetsRef, where('pk', '==', filmId));
const docSnap = await getDocs(q);

const docs = docSnap.docs.map(doc => doc.data() as FilmDocumentDTO);
const filmDocs = docs.map(filmDocument => filmMapper.fromDto(filmDocument));
const html = `
<h2>${filmDocs[0].title}</h2>
`;
detailsCard.innerHTML = html;
console.log(filmDocs);
