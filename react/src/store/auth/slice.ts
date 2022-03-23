import { createSlice } from '@reduxjs/toolkit';
import { login, logout } from './dispatchers';
import { initialState } from './state';

export const authSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(login.pending, state => {
      state.authLoading = true;
    })
    .addCase(login.fulfilled, state => {
      state.isUserAuthorized = true;
      state.authLoading = false;
      state.loginButtonText = 'Logout';
    })
    .addCase(login.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.loginButtonText = 'Login';
      state.isUserAuthorized = false;
      state.authLoading = false;
    })
    .addCase(logout.pending, state => {
      state.authLoading = true;
    })
    .addCase(logout.fulfilled, state => {
      state.isUserAuthorized = false;
      state.authLoading = false;
      state.loginButtonText = 'Login';
    })
    .addCase(logout.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.loginButtonText = 'Logout';
      state.authLoading = false;
      state.isUserAuthorized = true;
    }),
});
