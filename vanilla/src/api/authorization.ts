import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

import { Authorization } from './../entities/models/authorization';
export const authorization: Authorization = {

  isUserAuthorized: false,

  /**
   * Login through google account.
   * @param auth - Function from firebase.
   */
  async login(auth) {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    this.isUserAuthorized = true;
  },

  /**
   * Logging out of google account.
   * @param auth - Function from firebase.
   */
  async logout(auth) {
    await signOut(auth);
    this.isUserAuthorized = false;
  },

};
