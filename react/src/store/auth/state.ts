interface AuthState {
  /** */
  authLoading: boolean;

  /** */
  isUserAuthorized: boolean;

  /** */
  loginButtonText: string;

  /** */
  error?: string;
}

export const initialState: AuthState = {
  authLoading: false,
  isUserAuthorized: false,
  loginButtonText: 'Login',
};
