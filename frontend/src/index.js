import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-dom-router';

import Home from './page/home';



const Front = () =>{
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  }
])
};

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(<Front/>)

