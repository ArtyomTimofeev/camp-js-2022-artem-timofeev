import { memo, VFC } from 'react';
import {
  AppBar, Button, Toolbar, Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectIsAuthLoading, selectIsUserAuthorized, selectLoginButtonText } from 'src/store/auth/selectors';
import { login, logout } from 'src/store/auth/dispatchers';

const AppHeaderComponent: VFC = () => {
  const dispatch = useAppDispatch();
  const isUserAuthorized = useAppSelector(selectIsUserAuthorized);
  const isAuthLoading = useAppSelector(selectIsAuthLoading);
  const loginButtonText = useAppSelector(selectLoginButtonText);

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
        <Button color="secondary" variant="contained" disabled={isAuthLoading} onClick={toggleLogin}>
          {loginButtonText}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export const AppHeader = memo(AppHeaderComponent);
