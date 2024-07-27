import React, { useEffect, useState } from 'react';
import { getWeekDay, getCurrentTime } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData }) => {

  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  //Utilisation du hook useEffect pour mettre à jour l'heure chaque seconde
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime(weatherData.utc_offset_seconds));
    }, 1000);

    return () => clearInterval(interval);
  }, [weatherData.utc_offset_seconds]);

  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getWeekDay(weatherData)}, ${getCurrentTime(
          weatherData.current.time,
          weatherData.utc_offset_seconds
        )}`}
      </h2>
    </div>
  );
};
