import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBVP4nW_mUDrsy7XfLA50maV4t4b-E9gao',
  authDomain: 'vanilla-704bf.firebaseapp.com',
  projectId: 'vanilla-704bf',
  storageBucket: 'vanilla-704bf.appspot.com',
  messagingSenderId: '712963765026',
  appId: '1:712963765026:web:147f32c29622ea50ea6b7b',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
