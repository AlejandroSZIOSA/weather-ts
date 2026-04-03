import React from "react";
import { type WeatherCondition } from "@/services/APIs.types";
import styles from "./ImageWeatherCondition.module.css";

type Props = {
  data: WeatherCondition;
};

const ImageWeatherCondition: React.FC<Props> = ({ data }) => {
  return (
    <li className={styles["imageWeatherListContainer"]}>
      <img
        src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt={data.description}
      />
      <span> {data.description} </span>
    </li>
  );
};

export default ImageWeatherCondition;
