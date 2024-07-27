import { useState, useEffect } from "react";
import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";
import { setIconAndDesc } from "../services/getIconAndDesc";
import styles from "../styles/Home.module.css";
import config from "./api/config";

export const App = () => {
  const [triggerFetch, setTriggerFetch] = useState();
  const [weatherData, setWeatherData] = useState();
  const { city } = config;

  //Utilisation du hook useEffect pour récupérer les données météo chaque heure
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("api/data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        console.log('Données récupérées:', data);
        setWeatherData({ ...data });
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    //Mise en place de l'intervalle pour récupérer les données chaque heure
    const interval = setInterval(getData, 3600000);
    getData();
    return () => clearInterval(interval);
  }, [triggerFetch]);

  //On récupère l'icone et la description selon les données météo
  const [iconName, setIconNameState] = useState();
  const [desc, setDescState] = useState();

  useEffect(() => {
    if (weatherData) {
      const iconName = setIconAndDesc(weatherData);
      setIconNameState(iconName[0]);
      setDescState(iconName[1]);
    }
  }, [weatherData]);

  //L'affichage
  return weatherData && !weatherData.message ? (
    <div className={styles.wrapper}>
      <MainCard
        city={city}
        description={desc}
        iconName={iconName}
        weatherData={weatherData}
      />
      <ContentBox>
        <Header>

          <DateAndTime weatherData={weatherData} />

        </Header>
        <MetricsBox weatherData={weatherData} />
      </ContentBox>
    </div>
  ) : weatherData && weatherData.message ? (
    <ErrorScreen errorMessage="Erreur lors du chargement">
    </ErrorScreen>
  ) : (
    <LoadingScreen loadingMessage="Loading data..." />
  );
};

export default App;
