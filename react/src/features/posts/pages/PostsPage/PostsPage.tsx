import { memo, useEffect, VFC } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import { fetchPosts } from 'src/store/post/dispatchers';
import { selectIsPostsLoading, selectPosts } from 'src/store/post/selectors';
import { PostCard } from '../../components/PostCard';

const PostsPageComponent: VFC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const isLoading = useAppSelector(selectIsPostsLoading);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (isLoading && posts.length === 0) {
    return <div>Loading</div>;
  }
  return (
    <>
      <h1>Posts</h1>
      {posts.map(post => <PostCard key={post.id} post={post} />)}
    </>
  );
};

export const PostsPage = memo(PostsPageComponent);
