const latitude = 40.7128;
const longitude = -74.006;
const APIkey = "13f73a0fc9c7844102dd581da3e814e7";

export const getWeatherApi = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
  return weatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  const weather = {
    temperature: {
      F: Math.round(temperature),
      C: Math.round(((temperature - 32) * 5) / 9),
    },
  };
  console.log(weather);
  return weather;
};

export const parseLocationData = (data) => {
  const userLocation = data.name;
  return userLocation;
};

export const parseForcastData = (data) => {
  const weather = data.weather;
  const forcast = weather && weather[0].main.toLowerCase();
  return forcast;
};

export const parseTimeOfDay = (data) => {
  const currentTime = Date.now();
  const timeOfDay = data.sys;
  const sunrise = timeOfDay.sunrise;
  const sunset = timeOfDay.sunset;

  if (currentTime >= sunrise && !currentTime < sunset) {
    return true;
  } else {
    return false;
  }
};
