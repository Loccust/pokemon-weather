import { UPDATE_WEATHER } from '../actions/types';

export const setCurrentWeather = (weather: any) => ({
    type: UPDATE_WEATHER,
    newWeather: weather
  });