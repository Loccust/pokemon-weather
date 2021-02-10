import PokeApiService from "../../services/pokemon.service";
import { setCurrentPokemon } from '../../redux/actions';
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";
import { bindActionCreators } from "redux";

const PokemonWeather = (props: any) => {
  let history = useHistory();
  let setCurrentPokemon = props.setCurrentPokemon,
    curentWeather: any = props.curentWeather

  let pokemons: Array<any> = [];

  useEffect(() => {
    if (curentWeather.weather)
      searchPokemons(getType());
    else
      history.push('/');
  }, []);

  const { addToast } = useToasts(),

    getType = (): string => {
      let type: string = '',
        temp: number = curentWeather.main.temp,
        weather: string = curentWeather.weather.main;

      if (weather === 'Rain')
        type = 'eletric';
      else {
        if (temp < 5)
          type = "ice";
        else if (temp >= 5 && temp < 10)
          type = "water";
        else if (temp >= 12 && temp < 15)
          type = "grass";
        else if (temp >= 15 && temp < 21)
          type = "ground";
        else if (temp >= 23 && temp < 27)
          type = "bug";
        else if (temp >= 27 && temp <= 33)
          type = "rock";
        else if (temp > 33)
          type = "fire";
        else
          type = "normal";
      }
      return type;
    },

    getRandomArbitrary = (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min) + min);
    },

    searchPokemons = (type: string) => {
      PokeApiService.getPokemonsByType(type).then(async (response: any) => {
        console.log(response);
        if (response.status === 200) {
          pokemons = response.data.pokemon;
          console.log(response.data.pokemon);
          let randomIndex: number = await getRandomArbitrary(0, pokemons.length - 1);
          console.log(randomIndex);
          setCurrentPokemon(pokemons[randomIndex]);
        } else {
          addToast(response.message, { appearance: 'error' })
        }
      }).catch((err: any) => {
        console.error("ops! ocorreu um erro " + err);
        addToast(err.message, { appearance: 'error' })
      });
    }

  return (
    <div>

    </div>
  );
}

const mapStateToProps = (store: any) => ({
  curentWeather: store.weatherState.curentWeather
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ setCurrentPokemon }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PokemonWeather);