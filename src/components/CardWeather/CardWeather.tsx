import { type FC } from "react";
import type { CustomWeatherDataType } from "../../App";

interface CardWeatherProps {
  data: CustomWeatherDataType;
}
export const CardWeather: FC<CardWeatherProps> = ({ data }) => {
  return (
    <div>
      <div> img</div>
      <h2>{data.name}</h2>
      <p>{data.sys.country}</p>
      <p>{data.main.temp}°C</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind Speed: {data.wind.speed} m/s</p>
    </div>
  );
};
