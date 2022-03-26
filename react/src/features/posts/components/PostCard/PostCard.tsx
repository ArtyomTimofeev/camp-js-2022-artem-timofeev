import { memo, VFC } from 'react';
import { Post } from 'src/models/post';

interface Props {
  /** Post. */
  readonly post: Post;
}

const PostCardComponent: VFC<Props> = ({ post }) => (
  <div>
    <h2>{post.title}</h2>
    <span>{post.body}</span>
  </div>
);

export const PostCard = memo(PostCardComponent);
