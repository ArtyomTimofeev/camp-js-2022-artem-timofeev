import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { FirebaseService } from './firebase.service';

export namespace AuthService {
  const provider = new GoogleAuthProvider();

  /** Log in via google account. */
  export async function login(): Promise<void> {
    await signInWithPopup(FirebaseService.auth, provider);
  }

  /**  Log out via google account.. */
  export async function logout(): Promise<void> {
    await signOut(FirebaseService.auth);
  }
}
