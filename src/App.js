import React from 'react';
import "./App.css";
import { RouterProvider } from 'react-router-dom';
import ReactRoute from './routes/ReactRoute';

const App = () => {
  return (
    <RouterProvider router={ReactRoute} />
  )
}

export default App