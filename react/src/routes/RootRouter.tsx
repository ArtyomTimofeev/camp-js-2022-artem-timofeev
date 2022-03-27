import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { filmsRoutes } from 'src/features/films/routes';

const routes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/films" />,
  },
  ...filmsRoutes,
];

export const RootRouter: React.VFC = () => useRoutes(routes);
