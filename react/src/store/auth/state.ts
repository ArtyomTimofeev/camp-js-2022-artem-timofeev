interface AuthState {

  /** Auth Loading. */
  readonly authLoading: boolean;

  /** Is User Authorized. */
  readonly isUserAuthorized: boolean;

  /** Auth Error. */
  readonly error?: string;
}

export const initialState: AuthState = {
  authLoading: false,
  isUserAuthorized: false,
};
