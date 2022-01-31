import { Auth, signOut } from 'firebase/auth';

/**
 * Logging out of google account.
 * @param auth - Function from firebase.
 */
export const logout = async(auth: Auth): Promise<void> => {
  await signOut(auth);
};
