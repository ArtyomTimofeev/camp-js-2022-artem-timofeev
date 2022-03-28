import {
  Avatar, ListItemAvatar, ListItemText,
} from '@mui/material';
import { memo, VFC } from 'react';
import { Film } from 'src/models/film';
import MovieIcon from '@mui/icons-material/Movie';
import ListItem from '@mui/material/ListItem';
import { NavLink } from 'react-router-dom';

interface Props {

  /** Film. */
  readonly film: Film;
}

export const FilmItemComponent: VFC<Props> = ({ film }) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar>
        <MovieIcon />
      </Avatar>
    </ListItemAvatar>

    <ListItemText
      primary={(
        <NavLink to={`film-details/${film.id}`}>
          {film.title}
        </NavLink>
)}
      secondary={(
        <>
          <b>Release Date: </b>
          {film.releaseDate.toLocaleDateString()}
          <br />
          <b>Episode №: </b>
          {film.episodeId}
        </>
      )}
    />

  </ListItem>
);

export const FilmItem = memo(FilmItemComponent);
