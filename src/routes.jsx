import React from 'react';
import Login from './components/Login';
import Home from './components/Home';
import MoodLog from './components/MoodLog';
import Journal from './components/Journal';
import Goals from './components/Goals';

export const  routes = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/mood-log',
    element: <MoodLog />,
  },
  {
    path: '/journal',
    element: <Journal />,
  },
  {
    path: '/goals',
    element: <Goals />,
  }
];

