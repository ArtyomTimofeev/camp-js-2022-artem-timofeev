import { Auth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

/**
 * Class for working with authorization.
 */
class AuthService {

  /**
   * Login through google account.
   * @param auth - Auth param from firebase.
   */
  public async logout(auth: Auth): Promise<void> {
    await signOut(auth);
    localStorage.isUserAuthorized = false;
  }

  /**
   * Login through google account.
   * @param auth - Auth param from firebase.
   */
  public async login(auth: Auth): Promise <void> {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    localStorage.isUserAuthorized = true;
  }
}

export const authService = new AuthService();
