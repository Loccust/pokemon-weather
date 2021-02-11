import { UPDATE_WEATHER, UPDATE_POKEMON } from '../actions/types';

export const setCurrentWeather = (weather: any) => ({
    type: UPDATE_WEATHER,
    newWeather: weather
  });

  export const sethistoryPokemon = (pokemon: any) => ({
    type: UPDATE_POKEMON,
    newPokemon: pokemon
  });