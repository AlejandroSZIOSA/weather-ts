import axios from "axios";
import type { WeatherData } from "./APIs.types";

/* const API_KEY = import.meta.env.VITE_OWN_APIKEY;
 */

/* https://api.openweathermap.org/data/2.5/weather?appid=KEY=santiago
 */

const API_KEY = import.meta.env.VITE_OWN_APIKEY;

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FAKE_SLOW_API = true;
const FAKE_SLOW_API_DELAY = 2000;

export const getCurrentWeatherData = async (city: string) => {
  const res = await axios.get<WeatherData>(BASE_URL, {
    params: {
      q: city,
      units: "metric",
      appid: API_KEY,
    },
  });

  if (FAKE_SLOW_API) {
    await new Promise((resolve) => setTimeout(resolve, FAKE_SLOW_API_DELAY));
  }

  return res.data;
};
