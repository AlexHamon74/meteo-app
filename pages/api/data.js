import config from './config';

export default async function handler(req, res) {
  const { city } = config;

  try {
    //Requête pour obtenir les détails de la ville
    const getCityDetails = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=fr&format=json`
    );
    const cityDetails = await getCityDetails.json();

    //Gestion d'erreurs au cas où la ville n'est pas trouvée
    if (cityDetails.results.length === 0) {
      return res.status(404).json({ message: "Ville non trouvée, faites une nouvelle recherche" });
    };

    //On récupère les coordonnées de la ville
    const { latitude, longitude } = cityDetails.results[0];

    //On récupère les données météo grâce aux coordonnées de la ville
    const getCityWeather = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,visibility,wind_speed_10m,wind_direction_10m,weather_code&daily=sunrise,sunset&timeformat=unixtime&timezone=auto&forecast_days=1`
    );
    const cityWeather = await getCityWeather.json();

    res.status(200).json({ cityWeather });

  } catch (error) {
    //Gestion d'erreurs pour la requête API
    res.status(500).json({ message: "Erreur lors de la récupération des données", error: error.message });
  }
}