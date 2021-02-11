class Weather {
    public id: string = "";
    public main: string = "";
    public description: string = "";
    public icon: string = "";
}
class Main {
    public temp: number = 0;
    public pressure: number = 0;
    public humidity: number = 0;
    public temp_min: number = 0;
    public temp_max: number = 0;
}
export class LocationWeatherModel {
    public weather: Array<Weather> = [new Weather()];
    public main: Main = new Main();
    public name: string = "";
}