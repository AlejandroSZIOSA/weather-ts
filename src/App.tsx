/* import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png"; */
import "./App.css";

import { useState } from "react";
import { CardWeather } from "./components/CardWeather/CardWeather";
import { SearchCity } from "./components/SearchCity/SearchCity";
import { getCurrentWeatherData } from "./services/APIs";
import { type WeatherData } from "./services/APIs.types";

export type CustomWeatherDataType = Pick<
  WeatherData,
  "name" | "main" | "sys" | "wind"
>;

function App() {
  const [currentDataWeather, setCurrentWeather] =
    useState<CustomWeatherDataType | null>(null);

  const handleSearch = async (location: string) => {
    const data = await getCurrentWeatherData(location);
    setCurrentWeather(data);
  };

  return (
    <>
      <header>
        <h1>Wheather</h1>
      </header>
      <main>
        <SearchCity onSearch={handleSearch} />
        {currentDataWeather && <CardWeather data={currentDataWeather} />}
      </main>
    </>
  );
}

export default App;
