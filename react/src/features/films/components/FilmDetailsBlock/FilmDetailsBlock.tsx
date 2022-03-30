import {
  Box, Button, Paper, Typography,
} from '@mui/material';
import { useEffect, useState, VFC } from 'react';
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
import FilmForm from '../FilmForm/FilmForm';
import styles from './FilmDetailsBlock.module.css';

const FilmDetailsBlock: VFC = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const selectedFilm = useAppSelector(selectSelectedFilm);
  const requestError = useAppSelector(selectFetchFilmsError);
  const relatedPlanets = useAppSelector(selectPlanets);
  const relatedCharacters = useAppSelector(selectCharacters);

  const [isFormOpen, setIsOpenForm] = useState(false);

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

  const handleIsOpenFormChange = (value: boolean): void => {
    setIsOpenForm(value);
  };

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
          <b>Title: </b>
          {selectedFilm?.title}
        </Typography>

        <Typography variant="body1" component="p" color="primary">
          <b>Director: </b>
          {selectedFilm?.director}
        </Typography>
        <Typography variant="body1" component="p" color="primary">
          <b>Producer: </b>
          {selectedFilm?.producer}
        </Typography>
        <Typography variant="body1" component="p" color="primary">
          <b>Description: </b>
          {selectedFilm?.openingCrawl}
        </Typography>
        <Typography variant="body1" component="p" color="primary">
          <b>Release Date: </b>
          {selectedFilm?.releaseDate.toLocaleDateString()}
        </Typography>
        <Typography variant="body1" component="p" color="primary">
          <b>Episode №: </b>
          {selectedFilm?.episodeId}
        </Typography>

        <Typography variant="body1" component="span" color="primary">
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
        <Button variant="contained" color="primary" onClick={() => handleIsOpenFormChange(true)}>add</Button>
        <FilmForm handleIsOpenFormChange={handleIsOpenFormChange} isFormOpen={isFormOpen} />
      </Paper>
    </Box>
  );
};

export default FilmDetailsBlock;
