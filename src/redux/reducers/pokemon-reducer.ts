import { UPDATE_POKEMON } from "../actions/types";

const initialState: any = {
  historyPokemon: [],
};
export const PokemonReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_POKEMON:
      var currentHistoryPokemon = [...state.historyPokemon];
      if (currentHistoryPokemon.length > 1) {
        currentHistoryPokemon[0] = currentHistoryPokemon[1];
        currentHistoryPokemon[1] = action.newPokemon;
      } else {
        currentHistoryPokemon.push(action.newPokemon);
      }
      return {
        ...state,
        historyPokemon: currentHistoryPokemon,
      };
    default:
      return state;
  }
};
