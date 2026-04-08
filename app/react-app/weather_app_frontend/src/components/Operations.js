import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Display from './Display';
import WeatherService from '../service/WeatherService';

const Operations = ({ cities, setCities }) => {
  const [city, setCity] = useState({
    city: '',
  });
  const [error, setError] = useState('');

  const handle = (e) => {
    const { name, value } = e.target;
    setCity((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError(''); // Clear the error message when the user starts typing
  };

  const checkCityExists = (cityName) => {
    console.log("City name is", cityName);
    // This function calls the service that checks if the city exists.
    return WeatherService.checkCityExists(cityName);
  };

  const createRecord = () => {
    if (city.city.trim()) {
      
      // Check if the city already exists in the list of cities
      const cityExists = cities.some(existingCity => existingCity.city.toLowerCase() === city.city.toLowerCase());

      if (cityExists) {
        setError('City already exists');
        return; // Prevent the record from being created if the city exists
      }

      // Check if the city exists on the external API (e.g., OpenWeather)
      checkCityExists(city.city)
        .then(() => {
          // City exists on the external API, proceed to create the record
          WeatherService.createWeather(city)
            .then((response) => {
              console.log('City added successfully:', response.data.city);
              // Fetch the updated list of cities
              WeatherService.getAllWeather()
                .then((res) => {
                  setCities(res.data); // Update cities state with the new list
                });
              setCity({ city: '' }); // Reset input field after successful addition
            })
            .catch((error) => {
              console.error('Error adding city:', error);
              setError('Error adding city. Please try again.');
            });
        })
        .catch(() => {
          // City does not exist in the external API, set an error message
          setError('City does not exist');
        });
    } else {
      setError('City name is required'); // Set an error message if the input is empty
    }
  };

  return (
    <Container className="mx-auto">
      <Row className="justify-content-center">
        <Col xs="10" className="text-center">
          <div className="operations mx-auto">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <Button variant="success" onClick={createRecord}>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 50 50">
                    <path d="M 25 2 C 12.264481 2 2 12.264481 2 25 C 2 37.735519 12.264481 48 25 48 C 37.735519 48 48 37.735519 48 25 C 48 12.264481 37.735519 2 25 2 z M 25 4 C 36.664481 4 46 13.335519 46 25 C 46 36.664481 36.664481 46 25 46 C 13.335519 46 4 36.664481 4 25 C 4 13.335519 13.335519 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
                  </svg>
                </Button>
              </InputGroup.Text>
              <Form.Control
                placeholder="Enter City Name"
                aria-label="city name"
                aria-describedby="basic-addon1"
                onChange={handle}
                value={city.city}
                name="city"
                isInvalid={!!error}
              />
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            </InputGroup>

            <hr />

            <Display cities={cities} setCities={setCities} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Operations;
