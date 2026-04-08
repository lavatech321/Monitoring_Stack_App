package com.myapp.weather.repository;
import com.myapp.weather.model.Weather;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeatherRepository extends JpaRepository<Weather, Long> {
    boolean existsByCity(String city); // Check if a city exists in the database
}