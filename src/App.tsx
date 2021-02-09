import React, { useState } from 'react';
import { OpenWeatherMapService } from './services/weatherApi';

const App = () => {
  let cityWeather: any;
  const [value, setValue] = useState(''),
  weatherService = new OpenWeatherMapService(),
  handleChange = (e:any) => setValue(e.target.value),
  searchCityWeather = () => { cityWeather = weatherService.getCityWeather(value); }
  return (
    <div>
      <input type="text" value={value} onChange={handleChange} />
      <button onClick={searchCityWeather}>Buscar</button>
    </div>
  );
};

export default App;
