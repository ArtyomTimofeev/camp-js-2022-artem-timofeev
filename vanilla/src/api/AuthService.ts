import { Auth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

/**
 * Class for working with authorization.
 */
class AuthService {
  public isUserAuthorized = false;

  /**
   * Function to set isUserAuthorized flag to local storage.
   * @param isUserAuthFlag - Flag indicating whether the user is logged in (true/false).
   */
  public set isUserAuthorizedLocalStorage(isUserAuthFlag: boolean) {
    localStorage.isUserAuthorized = this.isUserAuthorized;
    this.isUserAuthorized = isUserAuthFlag;
  }

  /**
   * Function to return isUserAuthorized flag from local storage.
   * @returns IsUserAuthorized flag from local storage.
   */
  public get isUserAuthorizedLocalStorage(): boolean {
    return JSON.parse(localStorage.isUserAuthorized);
  }

  /**
   * Logout through google account.
   * @param auth - Auth param from firebase.
   */
  public async logout(auth: Auth): Promise<void> {
    await signOut(auth);
    this.isUserAuthorizedLocalStorage = false;
  }

  /**
   * Login through google account.
   * @param auth - Auth param from firebase.
   */
  public async login(auth: Auth): Promise <void> {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    this.isUserAuthorizedLocalStorage = true;
  }
}

export const authService = new AuthService();
