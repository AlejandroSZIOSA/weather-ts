import { type FC } from "react";
import type { CustomWeatherDataType } from "../../App";
import styles from "./CardWeather.module.css";
import ImageWeatherCondition from "../ImageWeatherCondition/ImageWeatherCondition";

interface CardWeatherProps {
  data: CustomWeatherDataType;
}
export const CardWeather: FC<CardWeatherProps> = ({ data }) => {
  return (
    <div className={styles["cardWeatherContainer"]}>
      {data.weather.map((condition) => (
        <ImageWeatherCondition key={condition.id} data={condition} />
      ))}
      <div className={styles["cardWeatherHeader"]}>
        <h1>
          {data.name}
          {","} <span>{data.sys.country}</span>
        </h1>
        <h1>{data.main.temp}°C</h1>
      </div>
      <div className={styles["cardWeatherDetails"]}>
        <p>Humidity: {data.main.humidity}%</p>
        <p>Wind Speed: {data.wind.speed} m/s</p>
      </div>
    </div>
  );
};
