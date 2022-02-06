import { Auth } from 'firebase/auth';

/**
 * Authorization model.
 */
export interface Authorization{

  /** Flag indicating whether the user is logged in. */
  isUserAuthorized: boolean;

  /**
   * Login through google account.
   * @param auth - Auth param from firebase.
   */
  login: (auth: Auth) => Promise<void>;

  /**
   * Login through google account.
   * @param auth - Auth param from firebase.
   */
  logout: (auth: Auth) => Promise<void>;
}
