import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

export namespace FirebaseService {
  export const app = initializeApp({
    apiKey: 'AIzaSyBVP4nW_mUDrsy7XfLA50maV4t4b-E9gao',
    authDomain: 'vanilla-704bf.firebaseapp.com',
    projectId: 'vanilla-704bf',
  });
  export const db = getFirestore(app);
  export const auth = getAuth(app);
}
