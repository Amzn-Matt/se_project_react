const latitude = 40.7128;
const longitude = -74.006;
const APIkey = "13f73a0fc9c7844102dd581da3e814e7";

export const getWeatherApi = () => {
  const WeatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
  return WeatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  return Math.ceil(temperature);
};

export const parseLocationData = (data) => {
  const userLocation = data.name;
  return userLocation;
};
