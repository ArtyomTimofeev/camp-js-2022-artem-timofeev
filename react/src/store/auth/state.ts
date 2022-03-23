interface AuthState {

  /** Auth Loading. */
  readonly authLoading: boolean;

  /** IsUserAuthorized flag. */
  readonly isUserAuthorized: boolean;

  /** Login Button Text. */
  readonly loginButtonText: string;

  /** Auth Error. */
  readonly error?: string;
}

export const initialState: AuthState = {
  authLoading: false,
  isUserAuthorized: false,
  loginButtonText: 'Login',
};
