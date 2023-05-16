import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import Home from './page/home';
import Espagnol from "./page/espagnol";
import Connexion from "./page/login";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'de',
    element: <Home />,
  },
  {
    path: 'it',
    element: <Home />,
  },
  {
    path: 'es',
    element: <Espagnol />,
  },
  {
    path: 'connexion',
    element: <Connexion />,
  },
  {
    path: 'profile/:username',
    element: <Home />,
  },
  {
    path: 'search',
    element: <Home />,
  },
  {
    path: 'leaderboard',
    element: <Home />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <RouterProvider router={router} />);

