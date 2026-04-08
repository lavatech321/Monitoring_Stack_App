package com.myapp.weather.controller;

import com.myapp.weather.exception.ResourceNotFoundException;
import com.myapp.weather.model.Weather;
import com.myapp.weather.repository.WeatherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/weather")
public class WeatherController {

    @Autowired
    WeatherRepository weatherRepository;

    @GetMapping
    public List<Weather> getAllWeather() {
        return weatherRepository.findAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<Weather> getWeather(@PathVariable Long id) {
        Weather w1 = weatherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Weather Record does not exists"));
        return ResponseEntity.ok(w1);
    }

    @PostMapping
    public ResponseEntity<String> createWeather(@RequestBody Weather w1) throws InterruptedException {
        // Check if the city already exists
        // {
        //    "city": "Delhi"
        // }
        //

        // Thread.sleep(10000); // Introduces a 10-second delay

        if (weatherRepository.existsByCity(w1.getCity())) {
            // If the city already exists, return a message saying the city already exists
            //Thread.sleep(10000); // Introduces a 5-second delay
            return ResponseEntity.status(400).body("City already exists");
        }
        //Thread.sleep(10000); // Introduces a 5-second delay

        // Save the new weather record
        weatherRepository.save(w1);
        return ResponseEntity.status(201).body("City added successfully");
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteWeather(@PathVariable Long id) throws InterruptedException {

        Thread.sleep(10000);
        Weather w1 = weatherRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Weather Record does not exist"));
        Thread.sleep(10000);
        weatherRepository.deleteById(id);
        return ResponseEntity.ok(HttpStatus.NO_CONTENT);
    }
}