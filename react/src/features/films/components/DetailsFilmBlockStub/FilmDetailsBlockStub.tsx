import { Box, Paper, Typography } from '@mui/material';
import { VFC } from 'react';
import styles from './FilmDetailsBlockStub.module.css';

const FilmDetailsBlockStub: VFC = () => (
  <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      '& > :not(style)': {
        marginLeft: 1,
        width: 800,
        height: 516,
      },
    }}
  >
    <Paper className={styles.paper}>
      <Typography variant="h5" component="h1" align="center" color="secondary">
        Viewing movie details is available only to authorized users
      </Typography>
    </Paper>
  </Box>
);

export default FilmDetailsBlockStub;
