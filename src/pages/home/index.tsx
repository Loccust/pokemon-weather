import OpenWeatherMapService from '../../services/weather.service';
import { setCurrentWeather } from '../../redux/actions';
import { useToasts } from 'react-toast-notifications'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useState } from 'react';

const Home = (props: any) => {
  let setCurrentWeather = props.setCurrentWeather,
    historyWeather: Array<any> = props.historyWeather,
    cityWeather: any;
  const { addToast } = useToasts()
  const [value, setValue] = useState(''),
    handleChange = (e: any) => setValue(e.target.value),
    searchCityWeather = () => {
      OpenWeatherMapService.getCityWeather(value).then((response: any) => {
        console.log(response);
        if (response.status === 200){
          cityWeather = response.data;
          setCurrentWeather(cityWeather);
          console.log(historyWeather);
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
      <input type="text" value={value} onChange={handleChange} />
      <button onClick={searchCityWeather}>Buscar</button>
    </div>
  );
};

const mapStateToProps = (store: any) => ({
  historyWeather: store.weatherState.historyWeather
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ setCurrentWeather }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
