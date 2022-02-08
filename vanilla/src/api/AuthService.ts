import { Auth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

/**
 * Class for working with authorization.
 */
class AuthService {
  /** Method to get isUserAuthorized flag. */
  public get isUserAuthorize(): boolean {
    return this._isUserAuthorized;
  }

  /** Flag indicating whether the user is logged in. */
  private _isUserAuthorized = false;

  /**
   * Login through google account.
   * @param auth - Auth param from firebase.
   */
  public async logout(auth: Auth): Promise<void> {
    await signOut(auth);
    this._isUserAuthorized = false;
  }

  /**
   * Login through google account.
   * @param auth - Auth param from firebase.
   */
  public async login(auth: Auth): Promise <void> {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    this._isUserAuthorized = true;
  }
}

export const authService = new AuthService();
