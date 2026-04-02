import { type FC } from "react";
import type { CustomWeatherDataType } from "../../App";
import styles from "./CardWeather.module.css";

interface CardWeatherProps {
  data: CustomWeatherDataType;
}
export const CardWeather: FC<CardWeatherProps> = ({ data }) => {
  return (
    <div className={styles["container"]}>
      <h2>
        {data.name} <span>{data.sys.country}</span>
      </h2>
      <p>{data.main.temp}°C</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind Speed: {data.wind.speed} m/s</p>
    </div>
  );
};
