/* import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png"; */
import "./App.css";

import { useEffect, useState } from "react";
import { CardWeather } from "./components/CardWeather/CardWeather";
import { SearchCity } from "./components/SearchCity/SearchCity";
import { getCurrentWeatherData } from "./services/APIs";

interface CurrentWeather {
  base: string;
  main: {
    temp: number;
  };
}

function App() {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>();

  useEffect(() => {
    getCurrentWeatherData("santiago").then((data) => {
      setCurrentWeather(data);
    });
  }, []);

  console.log(currentWeather);

  return (
    <main>
      <SearchCity />
      <CardWeather />
    </main>
  );
}

export default App;
