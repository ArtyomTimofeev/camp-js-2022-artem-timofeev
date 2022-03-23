import { VFC } from 'react';
import { Box, CircularProgress } from '@mui/material';

export const AppLoadingSpinnerComponent: VFC = () => (
  <Box sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    my: 2,
  }}
  >
    <CircularProgress />
  </Box>
);
