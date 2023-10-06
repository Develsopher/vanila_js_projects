export const getWeatherIconInfo = (statusCode, icon) => {
  if (statusCode == 800 && icon.endsWith('d')) {
    return 'CLEAR_DAY';
  } else if (statusCode == 800 && icon.endsWith('n')) {
    return 'CLEAR_NIGHT';
  } else if (statusCode > 800 && statusCode < 803 && icon.endsWith('d')) {
    return 'PARTLY_CLOUDY_DAY';
  } else if (statusCode > 800 && statusCode < 803 && icon.endsWith('n')) {
    return 'PARTLY_CLOUDY_NIGHT';
  } else if (statusCode >= 803) {
    return 'CLOUDY';
  } else if (statusCode >= 500 && statusCode < 600) {
    return 'RAIN';
  } else if (statusCode >= 600 && statusCode < 700) {
    return 'SNOW';
  } else {
    return 'FOG';
  }
};
