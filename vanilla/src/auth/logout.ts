import { signOut } from 'firebase/auth';

import { state } from '../state';

// logout
export const logout = (loginButton, auth): void => {
  signOut(auth).then(() => {
    state.isAuth = false;
    state.userData = null;
    loginButton.textContent = 'Login';
    });
  };
