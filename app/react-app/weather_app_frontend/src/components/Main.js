import 'bootstrap/dist/css/bootstrap.css';
import Header from './Header.js';
import Operations from './Operations.js';
import {useState, useEffect} from 'react';
import WeatherService from '../service/WeatherService.js';

function Main() {

  const [cities, setCities] = useState([]);

  useEffect(() => {
      // Fetch cities first
      WeatherService.getAllWeather()
        .then((response) => {
          setCities(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }, []);

  return (
    <>
    <Header cities={cities} setCities={setCities} />
    <Operations  cities={cities} setCities={setCities} />
    </>
  );
}

export default Main;
