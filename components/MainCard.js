import Image from "next/image";
import styles from "./MainCard.module.css";

export const MainCard = ({
  city,
  description,
  iconName,
  weatherData,
}) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.location}>
        {city}, {'FR'}
      </h1>
      <p className={styles.description}>{description}</p>
      <Image
        width="300px"
        height="300px"
        src={`/icons/${iconName}.svg`}
        alt="weatherIcon"
      />
      <h1 className={styles.temperature}>
        {Math.round(weatherData.current.temperature_2m)} °C
      </h1>
    </div>
  );
};
