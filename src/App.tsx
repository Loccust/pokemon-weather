import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux';
import { Store } from './redux/store';
import Routes from './routes';
import React from 'react';

const App = () => {
  return (
    <Provider store={Store}>
      <Routes />
    </Provider>
  );
};

export default App;
