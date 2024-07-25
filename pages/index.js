import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import styles from "../styles/Home.module.css";

export const App = () => {
  const [weatherData, setWeatherData] = useState();

  // Le hook userEffect permet à notre composant d'exécuter des actions après l'affichage
  useEffect(() => {
    //On récupère les données de météo
    const getData = async () => {
      const res = await fetch("api/data");
      const data = await res.json();
      console.log('Données récupérées:', data);
      setWeatherData({ ...data });
    };
    getData();
  }, []);


  return weatherData && !weatherData.message ? (
    //Si on a des données et si pas d'erreur alors on affiche
    
    <div className={styles.wrapper}>
      <MainCard
        city={weatherData.city}
        country={weatherData.country}
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
    <ErrorScreen errorMessage="Ville non trouvée, faites une nouvelle reherche">
    </ErrorScreen>
  ) : (
    <LoadingScreen loadingMessage="Chargement des données..." />
  );
};

export default App;
