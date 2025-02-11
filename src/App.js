import React from 'react';
import "./App.css";
import { RouterProvider } from 'react-router-dom';
import ReactRoute from './routes/ReactRoute';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { SnackbarProvider } from 'notistack';

const App = () => {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3} autoHideDuration={2000} >
        <RouterProvider router={ReactRoute} />
      </SnackbarProvider>
    </Provider>
  )
}

export default App