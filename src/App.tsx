import "./App.css";
import { useState, useRef } from "react";
import { CardWeather } from "@/components/CardWeather/CardWeather";
import { SearchCity } from "@/components/SearchCity/SearchCity";
import {
  getCurrentWeatherData,
  getCurrentPositionWeather,
} from "@/services/APIs";
import { type WeatherData } from "@/services/APIs.types";
import Spinner from "@/components/Spinner/Spinner";
import globeIcon from "@/assets/globe-icon.svg";
import { Messages } from "@/components/Messages/Messages";

export type CustomWeatherDataType = Pick<
  WeatherData,
  "name" | "main" | "sys" | "wind" | "weather" | "coord"
>;

type OperationSuccess = {
  operation: "searchByCity" | "currentPosition";
  isSuccess: boolean;
};

function App() {
  const [city, setCity] = useState("");
  const [currentDataWeather, setCurrentWeather] =
    useState<CustomWeatherDataType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | false>(false);
  const [success, setSuccess] = useState<OperationSuccess | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = async (location: string) => {
    setCurrentWeather(null); // Clear previous weather data
    setIsLoading(true);
    setError(false);
    setSuccess({ operation: "searchByCity", isSuccess: false });
    try {
      const data = await getCurrentWeatherData(location);
      setCurrentWeather(data);
      setIsLoading(false);
      setCity("");
      setSuccess({ operation: "searchByCity", isSuccess: true });
    } catch (err) {
      if (err instanceof Error && err.message.includes("404")) {
        setError("City not found.");
        setCurrentWeather(null);
      } else {
        setError("An unknown error occurred. Try later! :(");
        setCity("");
      }
    } finally {
      setIsLoading(false);
      inputRef.current?.focus(); //in this case and propose of the app doesn't need use gards
    }
  };

  const getCurrentPositionWeatherData = async (
    latitude: number,
    longitude: number,
  ) => {
    setCurrentWeather(null); // Clear previous weather data
    setIsLoading(true);
    setError(false);
    setSuccess({ operation: "currentPosition", isSuccess: false });
    try {
      const data = await getCurrentPositionWeather(latitude, longitude);
      setCurrentWeather(data);
      setCity("");
      setSuccess({ operation: "currentPosition", isSuccess: true });
    } catch (err) {
      setError("An unknown error occurred. Try later! :(");
      console.log("error: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMyCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      setIsLoading(true);
      setError(false);
      setSuccess({ operation: "currentPosition", isSuccess: false });
      try {
        getCurrentPositionWeatherData(latitude, longitude);
        console.log(latitude, longitude);
      } catch (err) {
        setError("An unknown error occurred. Try later! :(");
        console.log("error: ", err);
      }
    });
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
          {success &&
            success.operation === "searchByCity" &&
            success?.isSuccess && (
              <Messages variant="success">City has been found.</Messages>
            )}
          {success &&
            success.operation === "currentPosition" &&
            success?.isSuccess && (
              <Messages variant="success">
                Your position has been found.
              </Messages>
            )}
        </div>
        <div className="weather__container">
          {!currentDataWeather && <img src={globeIcon} />}
          {currentDataWeather && <CardWeather data={currentDataWeather} />}
        </div>
        <div className="coords__container">
          <p style={{ marginLeft: "0.5rem" }}>
            Longitud: {currentDataWeather && currentDataWeather.coord.lon}
          </p>
          <p style={{ marginRight: "0.5rem" }}>
            Latitude: {currentDataWeather && currentDataWeather.coord.lat}
          </p>
        </div>
        <div className="currentPositionButton__Container">
          <button onClick={handleMyCurrentPosition}>My Current Position</button>
        </div>
      </main>
      <footer>
        <a style={{ color: "black" }} href="https://openweathermap.org/">
          Source: openweathermap.org
        </a>
      </footer>
    </>
  );
}

export default App;
