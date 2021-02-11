import axios from "axios";
import { WEATHER_API_KEY } from "../settings";

const openWeatherMapEndPoint = "https://api.openweathermap.org/data/2.5";

const OpenWeatherMapService = {
  getCityWeather: function (city: string): Promise<any> {
    return axios.get(`${openWeatherMapEndPoint}/weather?q=${city}&appId=${WEATHER_API_KEY}`);
  }
}

export default OpenWeatherMapService;