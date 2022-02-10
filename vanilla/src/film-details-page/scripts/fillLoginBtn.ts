import { LOGOUT_TEXT, LOGIN_TEXT } from '../../utils/constants';

export const fillLoginBtn = (loginButton: HTMLButtonElement | null): void => {
    const isUserAuthorized = JSON.parse(localStorage.isUserAuthorized);

    if (!loginButton) {
      return;
    }

    if (isUserAuthorized) {
      loginButton.textContent = LOGOUT_TEXT;
    } else {
      loginButton.textContent = LOGIN_TEXT;
    }
  };
