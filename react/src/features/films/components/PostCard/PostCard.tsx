import {
  Avatar, ListItemAvatar, ListItemText,
} from '@mui/material';
import { memo, VFC } from 'react';
import { Film } from 'src/models/film';
import MovieIcon from '@mui/icons-material/Movie';
import ListItemButton from '@mui/material/ListItemButton';

interface Props {
  /** Film. */
  readonly post: Film;
}

const PostCardComponent: VFC<Props> = ({ post }) => (
  <ListItemButton>
    <ListItemAvatar>
      <Avatar>
        <MovieIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText
      primary={post.title}
      secondary={(
        <>
          <b>Release Date: </b>
          {post.releaseDate.toLocaleDateString()}
          <br />
          <b>Episode №: </b>
          {post.episodeId}
        </>
      )}
    />
  </ListItemButton>
);

export const PostCard = memo(PostCardComponent);
