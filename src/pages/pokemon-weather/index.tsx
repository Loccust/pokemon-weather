import PokeApiService from "../../services/pokemon.service";
import { setCurrentPokemon } from '../../redux/actions';
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { Container, Media, Row, Col, Card, Button, Spinner, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { GiFallingRocks, GiGroundSprout } from 'react-icons/gi';
import { FaStar, FaLeaf, FaBug, FaHotjar, FaTint, FaSnowflake, FaBolt } from 'react-icons/fa';
import { FiMapPin, FiSearch, FiCloud, FiCloudLightning, FiCloudSnow, FiCloudDrizzle, FiSun, FiArrowLeft } from 'react-icons/fi';
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

  const [temp, setTemp] = useState(0);
  const [weather, setWeather] = useState("");
  const [weatherIcon, setWeatherIcon] = useState(<></>);
  const [pokemonTypeIcon, setPokemonTypeIcon] = useState(<></>);

  const [spriteUrl, setSpriteUrl] = useState("");
  const [pokemon, setPokemon] = useState("");
  const [type, setType] = useState("");
  const { addToast } = useToasts();

  useEffect(() => {
    if (curentWeather.weather)
      searchPokemons(getType());
    else
      history.push('/');
  }, []);

  const getType = (): string => {
    let type: string = '';
    setTemp(curentWeather.main.temp - 273.15); //Kelvin => Celsius
    setWeather(curentWeather.weather[0].main);

    console.log('weather: ' + weather);

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
    getWeatherIcon();
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
          randomIndex = await getRandomArbitrary(0, pokemons.length - 1);
          setCurrentPokemon(pokemons[randomIndex]);//redx
          if (historyPokemon[0].name === pokemons[randomIndex].pokemon.name)
            searchPokemons(type);
          setPokemon(pokemons[randomIndex].pokemon.name);//context
          getPokemonImage(pokemons[randomIndex].pokemon.url);
          getPokemonTypeIcon();
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
    },

    getWeatherIcon = () => {
      const size = ".75em"
      switch (weather) {
        case "Clouds":
          setWeatherIcon(<FiCloud size={size} />)
          break;
        case "Snow":
          setWeatherIcon(<FiCloudSnow size={size} />)
          break;
        case "Rain":
          setWeatherIcon(<FiCloudLightning size={size} />)
          break;
        case "Drizzle":
          setWeatherIcon(<FiCloudDrizzle size={size} />)
          break;
        case "Clear":
          setWeatherIcon(<FiSun size={size} />)
          break;
      }
    },

    getPokemonTypeIcon = () => {
      const size = "1em"
      switch (type) {
        case "ice":
          setPokemonTypeIcon(<FaSnowflake size={size} />)
          break;
        case "water":
          setPokemonTypeIcon(<FaTint size={size} />)
          break;
        case "grass":
          setPokemonTypeIcon(<FaLeaf size={size} />)
          break;
        case "ground":
          setPokemonTypeIcon(<GiGroundSprout size={size} />)
          break;
        case "bug":
          setPokemonTypeIcon(<FaBug size={size} />)
          break;
        case "rock":
          setPokemonTypeIcon(<GiFallingRocks size={size} />)
          break;
        case "fire":
          setPokemonTypeIcon(<FaHotjar size={size} />)
          break;
        case "electric":
          setPokemonTypeIcon(<FaBolt size={size} />)
          break;
        case "normal":
          setPokemonTypeIcon(<FaStar size={size} />)
          break;
      }
    },

    renderTooltip = (props: any) => (
      <Tooltip id="button-tooltip" {...props}>
        {type}
      </Tooltip>
    );
  return (
    <Container className="wide" id="container">
      <div id="content-pw">
        <Row className="flex-row" id="top-row">
          <Col sm={12} md={6} className="flex-col">
            <Card className="styled-card" id="weather-card">
              <Card.Body>
                <h4><FiMapPin size=".75em" />  {curentWeather.name}</h4>
                <h3 className="font-weight-light"> {weatherIcon} {temp.toFixed(2).replace('.', ',')} ºC</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6} className="flex-col">
            <Card className="styled-card pokemon-card" id={type}>
              <Card.Body className="text-center justify-content-center">
                <Media className="text-center justify-content-center">
                  <img
                    width={spriteUrl ? 360 : 180}
                    height={spriteUrl ? 360 : 180}
                    className="align-self-center mr-3"
                    src={spriteUrl ? spriteUrl : "http://pngimg.com/uploads/pokeball/pokeball_PNG21.png"}
                    alt={pokemon}
                  />
                </Media>
                <div>
                  <h4 className="font-weight-bold" id="poke-name">{pokemon}</h4>
                  <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
                    {pokemonTypeIcon}
                  </OverlayTrigger>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col sm={6} md={2} className="flex-col">
            <Button variant="warning" className="styled-card" id="search-card" onClick={() => history.push('/')}>
              <FiArrowLeft />
            </Button>
          </Col>
          <Col sm={6} md={4} className="flex-col">
            <Button variant="danger" className="styled-card" id="search-card" onClick={() => searchPokemons(type)}>
              <FiSearch /> Buscar Pokemon
            </Button>
          </Col>
        </Row>
      </div>
    </Container >
  );
}

const mapStateToProps = (store: any) => ({
  curentWeather: store.weatherState.curentWeather,
  historyPokemon: store.pokemonState.historyPokemon
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ setCurrentPokemon }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PokemonWeather);