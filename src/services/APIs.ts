import axios from "axios";

/* const API_KEY = import.meta.env.VITE_OWN_APIKEY;
 */

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FAKE_SLOW_API = true;
const FAKE_SLOW_API_DELAY = 2000;

export const getCurrentWeather = async (city: string) => {
  if (FAKE_SLOW_API) {
    await new Promise((resolve) => setTimeout(resolve, FAKE_SLOW_API_DELAY));
  }
};
