import { useState, useEffect } from "react";
import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import styles from "../styles/Home.module.css";
import config from "./api/config";

export const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const { city } = config;

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("api/data");
        const data = await res.json();
        console.log('Données récupérées:', data);
        setWeatherData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    getData();
    const intervalId = setInterval(getData, 3600000);
    return () => clearInterval(intervalId);
  }, []);


  if (weatherData) {
    // Récupération des données horaires
    const { cityWeather } = weatherData;
    const hourlyData = cityWeather.hourly;
    const hourlyTimes = hourlyData.time;
    const hourlyTemperature = hourlyData.temperature_2m;
    const hourlyHumidity = hourlyData.relative_humidity_2m;
    const hourlyVisibility = hourlyData.visibility;
    const hourlyWindSpeed = hourlyData.wind_speed_10m;
    const hourlyWindDirection = hourlyData.wind_direction_10m;
    const hourlyWeatherCode = hourlyData.weather_code;

    // Convertir les timestamps Unix en heures locales
    const timezone = cityWeather.utc_offset_seconds;

    // Trouver l'index de l'heure actuelle
    const currentHourIndex = hourlyTimes.findIndex(timestamp => {
      const date = new Date((timestamp + timezone) * 1000);
      return date.getHours() === new Date().getHours();
    });

    if (currentHourIndex === -1) {
      console.log("L'heure actuelle n'est pas dans les données horaires.");
      return <LoadingScreen loadingMessage="Chargement des données..." />;
    }

    // Extraire les données pour l'heure actuelle
    const currentHourlyData = {
      temperature: hourlyTemperature[currentHourIndex],
      humidity: hourlyHumidity[currentHourIndex],
      visibility: hourlyVisibility[currentHourIndex],
      windSpeed: hourlyWindSpeed[currentHourIndex],
      windDirection: hourlyWindDirection[currentHourIndex],
      weatherCode: hourlyWeatherCode[currentHourIndex],
    };



    return weatherData && !weatherData.message ? (
      <div className={styles.wrapper}>
        <MainCard
          city={city}
          country={weatherData.country}
          description={`Temps actuel: ${currentHourlyData.weatherCode}`}
          iconName={currentHourlyData.weatherCode}
          weatherData={currentHourlyData}
        />
        <ContentBox>
          <Header>
            <DateAndTime weatherData={weatherData} />
          </Header>
          <MetricsBox weatherData={currentHourlyData} />
        </ContentBox>
      </div>
    ) : weatherData && weatherData.message ? (
      <ErrorScreen errorMessage="Ville non trouvée, faites une nouvelle recherche" />
    ) : (
      <LoadingScreen loadingMessage="Chargement des données..." />
    );
  }

  return <LoadingScreen loadingMessage="Chargement des données..." />;
};

export default App;
