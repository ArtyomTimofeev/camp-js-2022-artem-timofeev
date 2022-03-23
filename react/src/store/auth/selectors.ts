import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

/** Selects isUserAuthorized. */
export const selectIsUserAuthorized = createSelector(
  (state: RootState) => state.auth.isUserAuthorized,
  isUserAuthorized => isUserAuthorized,
);

/** Selects auth loading. */
export const selectIsAuthLoading = createSelector(
  (state: RootState) => state.auth.authLoading,
  authLoading => authLoading,
);

/** Selects login button text. */
export const selectLoginButtonText = createSelector(
  (state: RootState) => state.auth.loginButtonText,
  loginButtonText => loginButtonText,
);
