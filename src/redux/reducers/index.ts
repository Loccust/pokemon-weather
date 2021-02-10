
import { combineReducers } from 'redux';
import { PokemonReducer } from './pokemon-reducer';
import { WeatherReducer } from './weather-reducer';

export const Reducers = combineReducers({
    weatherState: WeatherReducer,
    pokemonState: PokemonReducer
});