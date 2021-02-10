import { UPDATE_WEATHER } from "../actions/types";

const initialState: any = {
  curentWeather: {},
};
export const WeatherReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_WEATHER:
      return {
        ...state,
        curentWeather: action.newWeather,
      };
    default:
      return state;
  }
};
