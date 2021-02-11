import { LocationWeatherModel } from './../../model/location-weather-model';
import { UPDATE_WEATHER } from "../actions/types";

const initialState: any = {
  currentWeather: new LocationWeatherModel(),
};
export const WeatherReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_WEATHER:
      return {
        ...state,
        currentWeather: action.newWeather,
      };
    default:
      return state;
  }
};
