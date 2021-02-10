import axios from "axios";

const pokeApiEndPoint = "https://pokeapi.co/api/v2";

const PokeApiService = {
  getPokemonsByType: function (type: string): Promise<any> {
    return axios.get(`${pokeApiEndPoint}/type/${type}`);
  }
}

export default PokeApiService;