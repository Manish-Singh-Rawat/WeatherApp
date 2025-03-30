import { useState } from "react";
import React from 'react';
import axios from 'axios';

export default function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9bf37e5b560ed61bcf0166833a809161&units=metric`);
      setWeather(response.data); // Store the weather data in state
    } catch (error) {
      console.log("Error fetching weather data", error);
    }
  };

  const handleClick = () => {
    fetchWeather();
  };

  return (
    <div className='weather-container'>
      <input
        type='text'
        placeholder='Enter City Name'
        value={city}
        onChange={handleCityChange}
      />
      <button onClick={handleClick}>Get Weather</button>

      {weather && (
        <div className='weather-info'>
          <h3>{weather.name}, {weather.sys.country}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p className='weather-description'>
            {weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}
          </p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}
