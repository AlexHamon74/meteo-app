import {
  unixToLocalTime
} from "./converters";

//Fonction pour obtenir la visibilité en kilomètres
export const getVisibility = (visibilityInMeters) => (visibilityInMeters / 1000).toFixed(1);

// Fonction pour obtenir l'heure locale
export const getCurrentTime = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const formattedHours = hours < 10 ? '0' + hours : hours;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  return `${formattedHours}:${formattedMinutes}`;
};

// Fonction qui convertit une heure Unix en heure locale
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
    new Date((weatherData.current.time + weatherData.utc_offset_seconds) * 1000).getUTCDay()
  ];
};
