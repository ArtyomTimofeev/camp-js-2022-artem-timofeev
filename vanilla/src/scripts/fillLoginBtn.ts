import { LOGOUT_TEXT, LOGIN_TEXT } from '../utils/constants';

import { authService } from './../api/AuthService';

export const fillLoginBtn = (loginButton: HTMLButtonElement | null): void => {

    if (!loginButton) {
      return;
    }

    if (authService.getIsUserAuthorized) {
      loginButton.textContent = LOGOUT_TEXT;
    } else {
      loginButton.textContent = LOGIN_TEXT;
    }
  };
