import { createSlice } from '@reduxjs/toolkit';
import { login, logout } from './dispatchers';
import { initialState } from './state';

export const authSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(login.pending, state => ({
      ...state,
      authLoading: true,
    }))
    .addCase(login.fulfilled, state => ({
      ...state,
      isUserAuthorized: true,
      authLoading: false,
    }))
    .addCase(login.rejected, (state, action) => {
      if (action.error.message) {
        return {
          ...state,
          isUserAuthorized: false,
          authLoading: false,
          error: action.error.message,
        };
      }
      return {
        ...state,
        isUserAuthorized: false,
        authLoading: false,
      };
    })
    .addCase(logout.pending, state => ({
      ...state,
      authLoading: true,
    }))
    .addCase(logout.fulfilled, state => ({
      ...state,
      isUserAuthorized: false,
      authLoading: false,
    }))
    .addCase(logout.rejected, (state, action) => {
      if (action.error.message) {
        return {
          ...state,
          isUserAuthorized: true,
          authLoading: false,
          error: action.error.message,
        };
      }
      return {
        ...state,
        isUserAuthorized: true,
        authLoading: false,
      };
    }),
});
