import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import Home from './page/home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/de',
    element: <Home />,
  },
  {
    path: '/it',
    element: <Home />,
  },
  {
    path: 'es',
    element: <Home />,
  },
  {
    path: 'connexion',
    element: <Home />,
  },
  {
    path: '/profile/<username>',
    element: <Home />,
  },
  {
    path: '/search',
    element: <Home />,
  },
  {
    path: '/leaderboard',
    element: <Home />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <RouterProvider router={router} />);

