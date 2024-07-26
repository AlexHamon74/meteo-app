import {
  unixToLocalTime
} from "./converters";

//Fonction pour obtenir la visibilité en kilomètres
export const getVisibility = (visibilityInMeters) => (visibilityInMeters / 1000).toFixed(1);

//Fonction pour obtenir l'heure locale
export const getTime = (timestamp, timezone) => unixToLocalTime(timestamp, timezone);

//Fonction pour obtenir le jour de la semaine en fonction des données météo
export const getWeekDay = (timestamp) => {
  const weekday = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  return weekday[new Date(timestamp * 1000).getDay()];

};
