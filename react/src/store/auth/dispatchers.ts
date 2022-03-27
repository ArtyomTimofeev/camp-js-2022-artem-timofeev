import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from 'src/api/services/auth.service';

export const login = createAsyncThunk(
  'auth/login',
  () => AuthService.login(),
);

export const logout = createAsyncThunk(
  'auth/logout',
  () => AuthService.logout(),
);
