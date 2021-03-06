import OpenWeatherMapService from '../../services/weather.service';
import { setCurrentWeather } from '../../redux/actions';
import { useToasts } from 'react-toast-notifications'
import { useHistory } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useState } from 'react';
import { Container, Row, Col, Jumbotron, Form, InputGroup, ButtonGroup, Button, Spinner } from 'react-bootstrap';
import './styles.scss';
import { FiMapPin, FiSearch } from 'react-icons/fi';
import { LocationWeatherModel } from '../../model/location-weather-model';

const Location = (props: any) => {
  let history = useHistory();
  let setCurrentWeather = props.setCurrentWeather,
    cityWeather: LocationWeatherModel = new LocationWeatherModel();


  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');
  const { addToast } = useToasts(),

    handleInputChange = (event: any) => setCity(event.target.value),

    handleSubmit = (event: any) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
        setValidated(true)
      } else {
        setValidated(false)
        searchCityWeather();
      }
      event.preventDefault();
    },

    searchCityWeather = () => {
      console.log(validated);
      if (!validated) {
        setLoading(true);
        OpenWeatherMapService.getCityWeather(city).then((response: any) => {
          if (response.status === 200) {
            setLoading(false);
            cityWeather = {
              main: response.data.main,
              weather: response.data.weather,
              name: response.data.name,
            };
            setCurrentWeather(cityWeather);
            history.push('/pokeweather');
          } else {
            setLoading(false);
            addToast(response.message, { appearance: 'error', autoDismiss: true })
          }
        }).catch((err: any) => {
          setLoading(false);
          console.error("ops! ocorreu um erro " + err);
          addToast(err.message, { appearance: 'error', autoDismiss: true })
        });
      }
    }

  return (
    <Container className="wide" id="location-container">
      <Row className="justify-content-md-center">
        <Col md={{ span: 8 }}>
          <Jumbotron>
            <h1 className="text-center font-weight-bold">Pokémon Weather</h1>
            <p className="text-center"> Encontre o Pokémon equivalente ao clima das cidades do mundo. </p>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="text-center">
              <ButtonGroup id="btt-group">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text><FiMapPin /></InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control type="text" placeholder="Digite a cidade" required
                    value={city} onChange={handleInputChange} />
                  <Form.Control.Feedback type="invalid">
                    O campo cidade deve ser preenchido!
                  </Form.Control.Feedback>
                </InputGroup>
                <Button id="buscar" type="submit" variant="danger" disabled={loading}>
                  {loading ?
                    <Spinner as="span" animation="border" role="status" size="sm" />
                    : <FiSearch />
                  } Buscar
                </Button>
              </ButtonGroup>
            </Form>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (store: any) => ({
  currentWeather: store.weatherState.currentWeather
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ setCurrentWeather }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Location);
