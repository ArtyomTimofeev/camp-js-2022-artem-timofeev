import { createTheme } from '@mui/material';
import { purple } from '@mui/material/colors';

/**
 * Material UI theme.
 * Learn more: https://mui.com/customization/theming/.
 */
export const theme = createTheme({
  palette: {
    primary: {
      main: '#24292f',
    },

    secondary: {
      main: purple[400],
    },
  },
});
