import PokeApiService from "../../services/pokemon.service";
import { setCurrentPokemon } from '../../redux/actions';
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { Container, Media, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import './styles.scss';
class Weather {
  main: string = 'Weather'
};
class Main {
  temp: number = 0;
}
class Pokemon {
  weather: Array<Weather> = new Array<Weather>();
  main: Main = new Main();
  name: string = "";
}
const PokemonWeather = (props: any) => {
  console.log(props)
  let history = useHistory(),
    setCurrentPokemon = props.setCurrentPokemon,
    curentWeather: Pokemon = props.curentWeather,
    historyPokemon: Array<any> = props.historyPokemon,
    randomIndex: number = 0,
    pokemons: Array<any> = [];

  useEffect(() => {
    if (curentWeather.weather)
      searchPokemons(getType());
    else
      history.push('/');
  }, []);

  const [temp, setTemp] = useState(0);
  const [weather, setWeather] = useState("");

  const [spriteUrl, setSpriteUrl] = useState("");
  const [pokemon, setPokemon] = useState("");
  const [type, setType] = useState("");
  const { addToast } = useToasts(),

    getType = (): string => {
      let type: string = '';
      setTemp(curentWeather.main.temp - 273.15); //Kelvin => Celsius
      setWeather(curentWeather.weather[0].main);

      if (weather === 'Rain')
        type = 'electric';
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
      setType(type);
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
          if (historyPokemon.length > 1)
            do {
              randomIndex = await getRandomArbitrary(0, pokemons.length - 1);
            } while (historyPokemon[0].name === pokemons[randomIndex].pokemon.name)

          setCurrentPokemon(pokemons[randomIndex]);//redx
          setPokemon(pokemons[randomIndex].pokemon.name);//context
          getPokemonImage(pokemons[randomIndex].pokemon.url);

        } else {
          addToast(response.message, { appearance: 'error' })
        }
      }).catch((err: any) => {
        console.error("ops! ocorreu um erro " + err);
        addToast(err.message, { appearance: 'error' })
      });
    },

    getPokemonImage = (url: string) => {
      console.log('type: ' + type)
      PokeApiService.getSprites(url).then(async (response: any) => {
        console.log(response);
        if (response.status === 200) {
          let sprites = response.data.sprites;
          setSpriteUrl(sprites.front_default);
        } else {
          addToast(response.message, { appearance: 'error' })
        }
      }).catch((err: any) => {
        console.error("ops! ocorreu um erro " + err);
        addToast(err.message, { appearance: 'error' })
      });
    }

  return (
    <Container className="wide" id="container">
      <div id="content-pw">
        <Row className="flex-row" id="top-row">
          <Col sm={12} md={6} className="flex-col">
            <Card className="styled-card" id="weather-card">
              <Card.Body>
                <Card.Text>
                  <h5>{curentWeather.name}</h5>
                  <h5>{weather}</h5>
                  <h3>{temp.toFixed(2).replace('.', ',')} ºC</h3>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6} className="flex-col">
            <Card className="styled-card pokemon-card" id={type}>
              <Card.Body className="text-center">
                <img
                  width={240}
                  height={240}
                  className="align-self-center mr-3"
                  src={spriteUrl}
                  alt={pokemon}
                />
                <h4>{pokemon}</h4>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col sm={12} md={6} className="flex-col">
            <Button className="styled-card" id="search-card" onClick={() => searchPokemons(type)}>
              Buscar
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

const mapStateToProps = (store: any) => ({
  curentWeather: store.weatherState.curentWeather,
  historyPokemon: store.pokemonState.historyPokemon
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ setCurrentPokemon }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PokemonWeather);