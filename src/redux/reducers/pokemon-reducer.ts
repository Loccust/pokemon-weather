import { PokemonModel } from "../../model/pokemon-model";
import { UPDATE_POKEMON } from "../actions/types";

const initialState: any = {
  historyPokemon: [
    new PokemonModel(),//current
    new PokemonModel() //prev
  ],
};
export const PokemonReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_POKEMON:
      var currentHistoryPokemon = [...state.historyPokemon];
      currentHistoryPokemon[1] = currentHistoryPokemon[0];
      currentHistoryPokemon[0] = action.newPokemon;
      return {
        ...state,
        historyPokemon: currentHistoryPokemon,
      };
    default:
      return state;
  }
};
