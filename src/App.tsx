import "./App.css";

import { useState, useRef } from "react";
import { CardWeather } from "@/components/CardWeather/CardWeather";
import { SearchCity } from "@/components/SearchCity/SearchCity";
import { getCurrentWeatherData } from "@/services/APIs";
import { type WeatherData } from "@/services/APIs.types";
import Spinner from "@/components/Spinner/Spinner";

import globeIcon from "@/assets/globe-icon.svg";

import { Messages } from "@/components/Messages/Messages";

export type CustomWeatherDataType = Pick<
  WeatherData,
  "name" | "main" | "sys" | "wind" | "weather"
>;

function App() {
  const [city, setCity] = useState("");

  const [currentDataWeather, setCurrentWeather] =
    useState<CustomWeatherDataType | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | false>(false);
  const [success, setSuccess] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = async (location: string) => {
    setCurrentWeather(null); // Clear previous weather data
    setIsLoading(true);
    setError(false);
    setSuccess(false);
    try {
      const data = await getCurrentWeatherData(location);
      setCurrentWeather(data);
      setIsLoading(false);
      setCity("");
      setSuccess(true);
    } catch (err) {
      if (err instanceof Error && err.message.includes("404")) {
        setError("City not found.");
        setCurrentWeather(null);
      } else {
        setError("An unknown error occurred. Try later! :(");
      }
    } finally {
      setIsLoading(false);
      inputRef.current?.focus(); //in this case and propose of the app doesn't need use gards
    }
  };

  return (
    <>
      <header>
        <h1>Weather-app</h1>
      </header>
      <main>
        <SearchCity
          city={city}
          setCity={setCity}
          onSearch={handleSearch}
          inputRef={inputRef}
        />
        <div className="message__container">
          {isLoading && <Spinner />}
          {error && <Messages variant="error">{error}</Messages>}
          {success && (
            <Messages variant="success">"City has been found."</Messages>
          )}
        </div>
        <div className="weather__container">
          {!currentDataWeather && <img src={globeIcon} />}
          {currentDataWeather && <CardWeather data={currentDataWeather} />}
        </div>
      </main>
      <footer>Source: openweathermap.org</footer>
    </>
  );
}

export default App;
