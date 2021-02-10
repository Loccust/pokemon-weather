import OpenWeatherMapService from '../../services/weather.service';
import { setCurrentWeather } from '../../redux/actions';
import { useToasts } from 'react-toast-notifications'
import { useHistory } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useState } from 'react';

const Location = (props: any) => {
  let history = useHistory();
  let setCurrentWeather = props.setCurrentWeather,
  curentWeather: any = props.curentWeather,
  cityWeather: any;
  
  const [city, setCity] = useState('');
  const { addToast } = useToasts(),

    handleChange = (e: any) => setCity(e.target.value),

    searchCityWeather = () => {
      OpenWeatherMapService.getCityWeather(city).then((response: any) => {
        console.log(response);
        if (response.status === 200) {
          cityWeather = response.data;
          setCurrentWeather(cityWeather);
          history.push('/pokeweather')
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
      <input type="text" value={city} onChange={handleChange} />
      <button onClick={searchCityWeather}>Buscar</button>
    </div>
  );
};

const mapStateToProps = (store: any) => ({
  curentWeather: store.weatherState.curentWeather
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ setCurrentWeather }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Location);
