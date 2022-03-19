import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { postsRoutes } from 'src/features/posts/routes';

const routes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/posts" />,
  },
  ...postsRoutes,
];

export const RootRouter: React.VFC = () => useRoutes(routes);
