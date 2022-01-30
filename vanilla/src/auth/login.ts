import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { state } from '../state';

// login through google account
export const login = (loginButton, auth): void => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(result => {
    const { user } = result;
    state.userData = user;
    state.isAuth = true;
    loginButton.textContent = 'Logout';
    });
  };
