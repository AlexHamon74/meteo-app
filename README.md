# Meteo App ⛅️

Ce projet consiste à cloner le projet de madzadev `https://github.com/madzadev/weather-app.git`.

Puis de le modifier en y utilisant l'API d'[`open météo`](https://open-meteo.com/) à la place.

Enfin il fallait supprimer la fonctionnalité de recherche de ville pour y ajouter un fichier de configuration dans lequel nous écrirons la ville française dont nous voulons la météo.

![Alt img](https://images.ctfassets.net/zlsyc9paq6sa/3uBrJ07WSM40FpolgjInHY/7d886cb4187b52194bf9b63c183a1d3a/1627637330_x.gif)

## Installation 📑

1. `git clone https://github.com/AlexHamon74/meteo-app.git`

2. ❗ Utiliser la version 16 de node pour installer le projet avec [`nvm`](https://github.com/nvm-sh/nvm)

3. `npm install`

4. Mettez la ville que vous souhaiter dans le dossier `/pages/api/config.js`

5. `npm run dev`

## Developpement 

### Instalation du projet
- Dans un premier temps je tout simplement essayer de faire marcher l'application de base.
Premier problème l'application ne fonctionnais pas quand j'utilisais la commande `npm run dev`.
J'ai ensuite compris qu'il fallais utiliser une autre version de node pour faire fonctionner le projet.
Puis créer un compte sur l'API d'[`Open Weather Map`](https://openweathermap.org/) et d'y integrer la clé dans le fichier `.env.exemple.`

### Modification de l'API
- Une fois l'application fonctionnel avec l'ancienne API j'ai du l'a changer avec la nouvelle.
Pour pouvoir l'utiliser il fallait d'abord récupérer la latitude et la longitude de la ville puis récupérer les données météos

### Affichage des données
- Apres avoir vérifié que je recuperrais bien mes données il fallait donc adapter la nouvella API dans la recupération de données.
J'ai d'abord pris la liberté de supprimer la logique de recherche de ville et d'enlever le format impérial car nous aurons que des villes de France pour plus de lisibilité.
Puis il m'a fallu avancer en régler une erreur après l'autre avant d'avoir enfin un affichage.

### Adapter et créer des fonctions pour afficher les données manquantes
- Après mon premier affichage il ma manquais l'affichage de l'heure de la description et de l'icone.
J'ai alors créer une fonction `getCurrentTime` pour afficher l'heure en direct.
Puis j'ai créer un SwitchCase qui affiche la description et l'image en fonction du `weather_code` que me retourne l'API.

### Actualisation des données météo
- J'ai utiliser le `setInterval` pour actualiser mes données toutes les heures.

```bash
const interval = setInterval(getData, 3600000);
getData();
return () => clearInterval(interval);
}, [triggerFetch]);
```
