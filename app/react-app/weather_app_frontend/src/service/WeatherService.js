import axios from "axios";

const APP_URL = "http://REPLACE-IP:7093/api/v1/weather";
const apiKey = '4476a71e445c5143ea30e2e1a616598f';
class WeatherService {

    async checkCityExists(cityName) {
        const WeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`;
        try {
          const response = await axios.get(WeatherUrl);
          if (response.status === 200 && response.data) {
            return; // City exists, resolve the promise
          } else {
            throw new Error('City does not exist'); // City does not exist
          }
        } catch (error) {
          console.error('Error checking city existence:', error);
          throw new Error('City does not exist');
        }
    }

    getAllWeather() {
        return axios.get(APP_URL);
    }

    deleteWeather(id){
        return axios.delete(`${APP_URL}/${id}`);
    }

    createWeather(weather){
        return axios.post(APP_URL,weather);
    }
}

//eslint-disable-next-line
export default new WeatherService();
