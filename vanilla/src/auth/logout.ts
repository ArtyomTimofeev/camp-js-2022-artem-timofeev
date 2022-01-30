import { signOut } from 'firebase/auth';

import { state } from '../state';

import { LOGIN } from './../utils/constants';

/**
 * Logging out of google account.
 * @param loginButton - Login button html selector.
 * @param auth - Function from firebase.
 */
export const logout = (loginButton, auth): void => {
  signOut(auth).then(() => {
    state.isAuth = false;
    state.userData = null;
    loginButton.textContent = LOGIN;
    });
  };
