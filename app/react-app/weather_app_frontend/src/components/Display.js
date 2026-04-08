import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import WeatherService from '../service/WeatherService';
import '../index.css';

const Display = ({cities, setCities}) => {
  const [weather, setWeather] = useState([]);
  const apiKey = '4476a71e445c5143ea30e2e1a616598f';
  
  useEffect(() => {
    if (cities) {
      const fetchWeather = async () => {
        const weatherData = await Promise.all(
          cities.map(async (city) => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.city}&appid=${apiKey}&units=metric`);
            const data = await response.json();
            console.log(data);
            return {
              id: city.id, // Use the id from the cities data
              city: data.name,
              temperature: data.main.temp,
              icon: data.weather[0].icon,
              description: data.weather[0].description,
            };
          })
        );
        setWeather(weatherData);
      };
      fetchWeather().catch(console.error);
    }
  }, [cities]); // Only runs when cities state is updated

  const deleteW = (id) => {
    console.log(id);
    WeatherService.deleteWeather(id)
    .then((response) => {
      setCities( preData => preData.filter(c => c.id !== id));
    })
    .catch((error) => {
      console.error(error);
    });
  }

  return (
    <>
      {weather.map((w) => (
        <div className="taskout" key={w.city}>
          <div className="taskalign">
            <div className="task">
              <img
                src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`}
                alt={w.description}
                width="45"
                height="45"
              />
              <div className="location-container">
                <h4 className="location-text">{w.city}</h4>
                <h5 className="temperature-text">{w.temperature} <span>&#176;</span> C</h5>
              </div>
            </div>
            <Button variant="secondary" className="small-cross-button" onClick={() => deleteW(w.id)}>
              &#x2715;
            </Button>
          </div>
          <hr></hr>
        </div>
      ))}
    </>
  );
};

export default Display;
