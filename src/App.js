import React from 'react';
import "./App.css";
import { RouterProvider } from 'react-router-dom';
import ReactRoute from './routes/ReactRoute';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={ReactRoute} />
    </Provider>
  )
}

export default App