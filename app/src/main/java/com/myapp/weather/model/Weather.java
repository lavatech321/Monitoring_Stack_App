package com.myapp.weather.model;

import jakarta.persistence.*;

@Entity
@Table(name = "weather")
public class Weather {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true, nullable = false)
    private String city;

    public Weather(long id, String city) {
        this.id = id;
        this.city = city;
    }

    public Weather() {
    }

    public long getId() {
        return this.id;
    }

    public String getCity() {
        return this.city;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setCity(String city) {
        this.city = city;
    }

}