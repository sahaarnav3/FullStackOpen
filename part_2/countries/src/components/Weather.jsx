import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function Weather({ lat, long, capital }) {
  const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const weatherAPIBaseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weatherApiKey}&units=metric`;
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get(weatherAPIBaseUrl)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((err) => console.log("weather err", err));
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
