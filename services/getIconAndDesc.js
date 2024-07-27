

export const setIconAndDesc = (weatherData) => {

    let weatherCode = (weatherData.current.weather_code);
    let day = (weatherData.current.is_day);
    let iconNb = '';
    let description = '';

    switch (weatherCode) {
        case 0:
            iconNb = '01';
            description = 'Clear sky';
            break;

        case 1:
        case 2:
        case 3:
            iconNb = '02';
            description = 'Few clouds';
            break;

        case 45:
        case 48:
            iconNb = '50';
            description = 'Foggy';
            break;

        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
            iconNb = '04';
            description = 'Cloudy';
            break;

        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
            iconNb = '09';
            description = 'Rainy';
            break;

        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
            iconNb = '13';
            description = 'Snow';
            break;

        case 80:
        case 81:
            iconNb = '10';
            description = 'Heavy rain';
            break;

        case 95:
        case 96:
        case 99:
            iconNb = '11';
            description = 'Thunderstorm';
            break;

    }

    const iconName = day === 1 ? `${iconNb}d` : `${iconNb}n`;
    const iconNameAndDesc = [iconName, description];

    return iconNameAndDesc;

}