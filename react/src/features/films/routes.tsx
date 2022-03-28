import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const FilmsPage = lazy(() => import('./pages/FilmsPage').then(module => ({ default: module.FilmsPage })));

export const filmsRoutes: RouteObject[] = [
  {
    path: 'films/*',
    element: <FilmsPage />,
  },
  {
    path: '*',
    element: <Navigate to="FilmsPage" />,
  },
];
