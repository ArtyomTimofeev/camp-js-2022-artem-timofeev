import { useState, VFC } from 'react';
import {
  AppBar, Button, Toolbar, Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectIsAuthLoading, selectIsUserAuthorized } from 'src/store/auth/selectors';
import { login, logout } from 'src/store/auth/dispatchers';

export const AppHeader: VFC = () => {
  const dispatch = useAppDispatch();
  const isUserAuthorized = useAppSelector(selectIsUserAuthorized);
  const isAuthLoading = useAppSelector(selectIsAuthLoading);

  const [loginButtonText, setLoginButtonText] = useState('Login');

  const toggleLogin = (): void => {
    if (isUserAuthorized) {
      dispatch(logout());
      setLoginButtonText('Login');
    } else {
      dispatch(login());
      setLoginButtonText('Logout');
    }
  };

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Typography
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          variant="h6"
          color="inherit"
          component="div"
        >
          SW Films
        </Typography>
        <Button type="button" color="secondary" variant="contained" disabled={isAuthLoading} onClick={toggleLogin}>
          {loginButtonText}
        </Button>
      </Toolbar>
    </AppBar>
  );
};
