
import { combineReducers } from 'redux';
import { WeatherReducer } from './weather-reducer';

export const Reducers = combineReducers({
    weatherState: WeatherReducer,
});