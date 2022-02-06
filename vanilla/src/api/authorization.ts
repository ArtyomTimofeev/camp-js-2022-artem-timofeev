import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

import { Authorization } from './../entities/models/authorization';

export const authorization: Authorization = {

  isUserAuthorized: false,

  async login(auth) {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    this.isUserAuthorized = true;
  },

  async logout(auth) {
    await signOut(auth);
    this.isUserAuthorized = false;
  },
};
