// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import App from './App';
// import { routes } from './routes';
// import './index.css';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     children: routes
//   }
// ],{ basename: process.env.PUBLIC_URL || '/' });

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );


import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { routes } from './routes';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: routes
  }
], {
  basename: import.meta.env.BASE_URL || '/' // Updated line
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);