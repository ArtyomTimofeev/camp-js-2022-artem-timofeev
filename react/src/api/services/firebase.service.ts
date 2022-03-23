import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

export namespace FirebaseService {
  export const app = initializeApp({
    projectId: 'vanilla-704bf',
    appId: '1:712963765026:web:147f32c29622ea50ea6b7b',
    storageBucket: 'vanilla-704bf.appspot.com',
    apiKey: 'AIzaSyBVP4nW_mUDrsy7XfLA50maV4t4b-E9gao',
    authDomain: 'vanilla-704bf.firebaseapp.com',
    messagingSenderId: '712963765026',
  });
  export const db = getFirestore(app);
}
