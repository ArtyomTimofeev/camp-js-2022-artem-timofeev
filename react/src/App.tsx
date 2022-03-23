import { Box, Container, ThemeProvider } from '@mui/material';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppHeader } from './components/AppHeader';
import { AppLoadingSpinner } from './components/AppLoadingSpinner';

import { RootRouter } from './routes/RootRouter';
import { store } from './store';
import { theme } from './theme/mui-theme';
import './theme/index';

export const App: React.VFC = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <AppHeader />
          <Container component="main" sx={{ padding: 10, flexGrow: 1 }}>
            <Suspense fallback={<AppLoadingSpinner />}>
              <RootRouter />
            </Suspense>
          </Container>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);
