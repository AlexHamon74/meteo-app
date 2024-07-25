import {
  unixToLocalTime
} from "./converters";

//Fonction pour obtenir la vitesse du vent en mètres par seconde
export const getWindSpeed = (windInMps) =>
  windInMps;

//Fonction pour obtenir la visibilité en kilomètres
export const getVisibility = (visibilityInMeters) =>
  (visibilityInMeters / 1000).toFixed(1);

//Fonction pour obtenir l'heure locale
export const getTime = (currentTime, timezone) =>
  unixToLocalTime(currentTime, timezone);

//Fonction pour obtenir le jour de la semaine en fonction des données météo
export const getWeekDay = (weatherData) => {
  const weekday = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  return weekday[
    new Date((weatherData.dt + weatherData.timezone) * 1000).getUTCDay()
  ];
};
