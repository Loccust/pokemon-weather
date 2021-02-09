import OpenWeatherMapService from './services/weather.service';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { Store } from './redux/store';
import Routes from './routes';

const App = () => {
  return (
    <Provider store={Store}>
      <Routes />
    </Provider>
  );
};

export default App;
