import { Auth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

/**
 * Class for working with authorization.
 */
class AuthService {
  /**
   * Function to set isUserAuthorized flag to local storage.
   * @param isUserAuthFlag - Flag indicating whether the user is logged in.
   */
  public set isUserAuthorized(isUserAuthFlag) {
    localStorage.isUserAuthorized = isUserAuthFlag;
  }

  /**
   * Function to return isUserAuthorized flag from local storage.
   * @returns IsUserAuthorized flag from local storage.
   */
  public get isUserAuthorized(): boolean {
    if (!localStorage.isUserAuthorized) {
      localStorage.isUserAuthorized = this.defaultIsUserAuthorized;
    }
    return JSON.parse(localStorage.isUserAuthorized);
  }

  private defaultIsUserAuthorized = false;

  /**
   * Logout through google account.
   * @param auth - Auth param from firebase.
   */
  public async logout(auth: Auth): Promise<void> {
    await signOut(auth);
    this.isUserAuthorized = false;
  }

  /**
   * Login through google account.
   * @param auth - Auth param from firebase.
   */
  public async login(auth: Auth): Promise <void> {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    this.isUserAuthorized = true;
  }
}

export const authService = new AuthService();
