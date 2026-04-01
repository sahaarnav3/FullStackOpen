import axios from "axios";
const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;

const getWeatherData = (lat, long) => {
  const weatherAPIBaseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weatherApiKey}&units=metric`;
  const response = axios.get(weatherAPIBaseUrl);
  return response.then((response) => response.data);
};

export default getWeatherData;
