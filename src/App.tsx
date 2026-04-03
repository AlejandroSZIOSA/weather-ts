/* import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png"; */
import "./App.css";

import { useState, useRef } from "react";
import { CardWeather } from "@/components/CardWeather/CardWeather";
import { SearchCity } from "@/components/SearchCity/SearchCity";
import { getCurrentWeatherData } from "@/services/APIs";
import { type WeatherData } from "@/services/APIs.types";
import Loading from "./components/Loading/Loading";

import Message from "./components/Messages/Messages";

export type CustomWeatherDataType = Pick<
  WeatherData,
  "name" | "main" | "sys" | "wind"
>;

function App() {
  const [city, setCity] = useState("");

  const [currentDataWeather, setCurrentWeather] =
    useState<CustomWeatherDataType | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | false>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = async (location: string) => {
    setCurrentWeather(null); // Clear previous weather data
    setIsLoading(true);
    setError(false);

    try {
      const data = await getCurrentWeatherData(location);
      setCurrentWeather(data);
      setIsLoading(false);
      setCity("");
    } catch (err) {
      if (err instanceof Error) {
        setError("City not found.");
        setCurrentWeather(null);
      } else {
        setError("An unknown error occurred. Try later!");
      }
    } finally {
      setIsLoading(false);
      inputRef.current?.focus(); //in this case and propouse of the app doesnt need use gards
    }
  };

  return (
    <>
      <header>
        <h1>Wheather</h1>
      </header>
      <main className="home__container">
        <div>
          <SearchCity
            city={city}
            setCity={setCity}
            onSearch={handleSearch}
            inputRef={inputRef}
          />
        </div>
        {isLoading && <Loading />}
        <Message>{error && <p style={{ color: "red" }}>{error}</p>}</Message>
        <div className="inner__container">
          {currentDataWeather && <CardWeather data={currentDataWeather} />}
        </div>
      </main>
    </>
  );
}

export default App;
