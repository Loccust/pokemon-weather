import axios from "axios";

const openWeatherMapEndPoint = " https://api.openweathermap.org/data/2.5";
const apiKey = "470fb367d3ba82b1f2ddc2837383525e";

export class OpenWeatherMapService {
  getCityWeather(city: string){
    console.log(city);
    axios.get(`${openWeatherMapEndPoint}/weather?q=${city}&appId=${apiKey}`).then((response:any) => {
      console.log(response);
      return response.data;
    }).catch((err) => {
      console.error("ops! ocorreu um erro" + err);
   });
    
  }
}