import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import styles from "../styles/Home.module.css";

export const App = () => {
  const [weatherData, setWeatherData] = useState();
  const [unitSystem, setUnitSystem] = useState("metric");

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


  //Fonction pour changer le système d'unités entre "metric" et "imperial"
  const changeSystem = () =>
    unitSystem == "metric" ? setUnitSystem("imperial") : setUnitSystem("metric");


  return weatherData && !weatherData.message ? (
    //Si on a des données et si pas d'erreur alors on affiche
    
    <div className={styles.wrapper}>
      <MainCard
        city={weatherData.city}
        country={weatherData.country}
        // description={weatherData.weather[0].description}
        // iconName={weatherData.weather[0].icon}
        unitSystem={unitSystem}
        weatherData={weatherData}
      />
      <ContentBox>
        <Header>
          <DateAndTime weatherData={weatherData} unitSystem={unitSystem} />
        </Header>
        <MetricsBox weatherData={weatherData} unitSystem={unitSystem} />
        <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
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
