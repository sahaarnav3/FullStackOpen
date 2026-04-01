import { useEffect } from "react";
import { useState } from "react";
import getWeatherData from "../services/weather";

export default function Weather({ lat, long, capital }) {
  
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    getWeatherData(lat, long).then(data => setWeatherData(data));
  }, []);

  return (
    weatherData && (
      <div>
        <h1>Weather in {capital}</h1>
        <p>Temperature {weatherData?.main.temp} Celsius</p>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
          alt={weatherData?.weather[0].description}
        />
        <p>Wind {weatherData?.wind.speed} m/s</p>
      </div>
    )
  );
}
