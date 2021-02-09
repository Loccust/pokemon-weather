import { UPDATE_WEATHER } from '../actions/types';

const initialState: any = {
    historyWeather: [],
};
export const WeatherReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case UPDATE_WEATHER:
            var currentHistoryWeather = [...state.historyWeather];
            if (currentHistoryWeather.length > 1) {
                currentHistoryWeather[0] = currentHistoryWeather[1];
                currentHistoryWeather[1] = action.newWeather;
            } else {
                currentHistoryWeather.push(action.newWeather);
            }
            return {
                ...state,
                historyWeather: currentHistoryWeather
            }
        default:
            return state;

    }
}