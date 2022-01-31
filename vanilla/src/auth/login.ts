import { signInWithPopup, GoogleAuthProvider, Auth } from 'firebase/auth';

/**
 * Login through google account.
 * @param auth - Function from firebase.
 */
export const login = async(auth: Auth): Promise<void> => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};
