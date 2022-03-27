import { VFC } from 'react';
import {
  AppBar, Button, Toolbar, Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectIsAuthLoading, selectIsUserAuthorized } from 'src/store/auth/selectors';
import { login, logout } from 'src/store/auth/dispatchers';
import { LOGIN_TEXT, LOGOUT_TEXT } from 'src/utils/constants';

export const AppHeader: VFC = () => {
  const dispatch = useAppDispatch();
  const isUserAuthorized = useAppSelector(selectIsUserAuthorized);
  const isAuthLoading = useAppSelector(selectIsAuthLoading);

  const loginButtonText = isUserAuthorized ? LOGOUT_TEXT : LOGIN_TEXT;

  /** Runs a function depending on the authorization status. */
  const toggleLogin = (): void => {
    if (isUserAuthorized) {
      dispatch(logout());
    } else {
      dispatch(login());
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
