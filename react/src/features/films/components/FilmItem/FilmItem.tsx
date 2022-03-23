import {
  Avatar, ListItemAvatar, ListItemText,
} from '@mui/material';
import { VFC } from 'react';
import { Film } from 'src/models/film';
import MovieIcon from '@mui/icons-material/Movie';
import ListItemButton from '@mui/material/ListItemButton';

interface Props {

  /** Film. */
  readonly film: Film;
}

export const FilmItemComponent: VFC<Props> = ({ film }) => (
  <ListItemButton>
    <ListItemAvatar>
      <Avatar>
        <MovieIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText
      primary={film.title}
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
  </ListItemButton>
);
