import { LOGOUT_TEXT, LOGIN_TEXT } from '../utils/constants';
import { isUserAuthorized } from '../utils/services';

export const fillLoginBtn = (loginButton: HTMLButtonElement | null): void => {

    if (!loginButton) {
      return;
    }

    if (isUserAuthorized()) {
      loginButton.textContent = LOGOUT_TEXT;
    } else {
      loginButton.textContent = LOGIN_TEXT;
    }
  };
