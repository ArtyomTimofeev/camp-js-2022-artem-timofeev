import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const PostsPage = lazy(() => import('./pages/PostsPage').then(module => ({ default: module.PostsPage })));

export const postsRoutes: RouteObject[] = [
  {
    path: 'posts',
    element: <PostsPage />,
  },
  {
    path: '*',
    element: <Navigate to="PostsPage" />,
  },
];
