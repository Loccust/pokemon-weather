import axios from "axios";

const openWeatherMapEndPoint = "https://api.openweathermap.org/data/2.5";
const apiKey = "470fb367d3ba82b1f2ddc2837383525e";

const OpenWeatherMapService = {
  getCityWeather: function (city: string): Promise<any> {
    return axios.get(`${openWeatherMapEndPoint}/weather?q=${city}&appId=${apiKey}`);
  }
}

export default OpenWeatherMapService;