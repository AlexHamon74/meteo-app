import { getWeekDay, getTime } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData }) => {

  const currentTime = getTime(new Date().getTime() / 1000, weatherData.cityWeather.utc_offset_seconds);

  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getWeekDay(new Date().getTime() / 1000)}, ${currentTime}`}
      </h2>
    </div>
  );
};
