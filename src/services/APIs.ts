import axios from "axios";
import type { WeatherData } from "./APIs.types";

const API_KEY = import.meta.env["VITE_OWN_APIKEY"];

const BASE_API_URL = "https://api.openweathermap.org/data/2.5/weather";

export const getCurrentWeatherData = async (city: string) => {
  const res = await axios.get<WeatherData>(BASE_API_URL, {
    params: {
      q: city,
      units: "metric",
      appid: API_KEY,
    },
  });

  return res.data;
};

export const getCurrentPositionWeather = async (
  latitude: number,
  longitude: number,
) => {
  const res = await axios.get<WeatherData>(BASE_API_URL, {
    params: { lat: latitude, lon: longitude, units: "metric", appid: API_KEY },
  });
  return res.data;
};
