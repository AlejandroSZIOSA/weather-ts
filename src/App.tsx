/* import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png"; */
import "./App.css";

import { useState } from "react";
import { CardWeather } from "@/components/CardWeather/CardWeather";
import { SearchCity } from "@/components/SearchCity/SearchCity";
import { getCurrentWeatherData } from "@/services/APIs";
import { type WeatherData } from "@/services/APIs.types";
import Loading from "./components/Loading/Loading";

export type CustomWeatherDataType = Pick<
  WeatherData,
  "name" | "main" | "sys" | "wind"
>;

function App() {
  const [currentDataWeather, setCurrentWeather] =
    useState<CustomWeatherDataType | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | false>(false);

  const handleSearch = async (location: string) => {
    setCurrentWeather(null); // Clear previous weather data
    setIsLoading(true);
    setError(false);

    try {
      const data = await getCurrentWeatherData(location);
      setCurrentWeather(data);
      setIsLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        setCurrentWeather(null);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header>
        <h1>Wheather</h1>
      </header>
      <main className="home_container">
        <SearchCity onSearch={handleSearch} />
        {isLoading && <Loading />}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {currentDataWeather && <CardWeather data={currentDataWeather} />}
      </main>
    </>
  );
}

export default App;
