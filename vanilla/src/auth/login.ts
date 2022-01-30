import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { state } from '../state';

import { LOGOUT } from './../utils/constants';

/**
 * Login through google account.
 * @param loginButton - Login button html selector.
 * @param auth - Function from firebase.
 */
export const login = (loginButton, auth): void => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(result => {
    const { user } = result;
    state.userData = user;
    state.isAuth = true;
    loginButton.textContent = LOGOUT;
    });
  };
