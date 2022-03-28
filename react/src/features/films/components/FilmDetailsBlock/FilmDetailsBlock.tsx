import { Box, Paper, Typography } from '@mui/material';
import { useEffect, VFC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/store';
import { fetchRelatedCharacters } from 'src/store/character/dispatchers';
import { selectCharacters } from 'src/store/character/selectors';
import { fetchFilmById } from 'src/store/films/dispatchers';
import {
  selectFetchFilmsError,
  selectSelectedFilm,
} from 'src/store/films/selectors';
import { fetchRelatedPlanets } from 'src/store/planet/dispatchers';
import { selectPlanets } from 'src/store/planet/selectors';
import styles from './FilmDetailsBlock.module.css';

const FilmDetailsBlock: VFC = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const selectedFilm = useAppSelector(selectSelectedFilm);
  const requestError = useAppSelector(selectFetchFilmsError);
  const relatedPlanets = useAppSelector(selectPlanets);
  const relatedCharacters = useAppSelector(selectCharacters);

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmById(id));
    } else {
      console.error(requestError);
    }
  }, [dispatch, id, requestError]);

  useEffect(() => {
    if (selectedFilm) {
      const { planetsIds, charactersIds } = selectedFilm;
      dispatch(fetchRelatedCharacters(charactersIds));
      dispatch(fetchRelatedPlanets(planetsIds));
    }
  }, [dispatch, selectedFilm]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          marginLeft: 1,
          p: 4,
          width: 800,
          height: 452,
          overflow: 'auto',
        },
      }}
    >
      <Paper className={styles.paper}>
        <Typography variant="h5" component="h1" align="center" color="primary">
          <strong>Title: </strong>
          {selectedFilm?.title}
        </Typography>
        <Typography variant="body1" component="p" color="primary">
          <strong>Director: </strong>
          {selectedFilm?.director}
        </Typography>
        <Typography variant="body1" component="p" color="primary">
          <strong>Producer: </strong>
          {selectedFilm?.producer}
        </Typography>
        <Typography variant="body1" component="p" color="primary">
          <strong>Description: </strong>
          {selectedFilm?.openingCrawl}
        </Typography>
        <Typography variant="body1" component="p" color="primary">
          <strong>Release Date: </strong>
          {selectedFilm?.releaseDate.toLocaleDateString()}
        </Typography>
        <Typography variant="body1" component="p" color="primary">
          <strong>Episode №: </strong>
          {selectedFilm?.episodeId}
        </Typography>

        <Typography variant="body1" component="p" color="primary">
          <strong>The planets on which the action took place: </strong>
          {relatedPlanets.map(planet => (
            <span key={planet.id}>
              {planet.name}
              {' '}
            </span>
          ))}
        </Typography>

        <Typography variant="body1" component="span" color="primary">
          <strong>Characters featured in the film: </strong>
          {relatedCharacters.map(character => (
            <span key={character.id}>
              {character.name}
              {' '}
            </span>
          ))}
        </Typography>

      </Paper>
    </Box>
  );
};

export default FilmDetailsBlock;
