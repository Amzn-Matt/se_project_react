const WeatherOptions = [
  {
    url: require("../../images/Day/sunny.svg").default,
    day: true,
    type: "sunny",
  },
  {
    url: require("../../images/Day/cloudy.svg").default,
    day: true,
    type: "cloudy",
  },
  {
    url: require("../../images/Day/rainy.svg").default,
    day: true,
    type: "rainy",
  },
  {
    url: require("../../images/Day/snow.svg").default,
    day: true,
    type: "snow",
  },
  {
    url: require("../../images/Day/storm.svg").default,
    day: true,
    type: "storm",
  },
  { url: require("../../images/Day/fog.svg").default, day: true, type: "fog" },
  {
    url: require("../../images/Night/cloudy-night.svg").default,
    day: false,
    type: "cloudy",
  },
  {
    url: require("../../images/Night/night.svg").default,
    day: false,
    type: "night",
  },
  {
    url: require("../../images/Night/rain-night.svg").default,
    day: false,
    type: "rainy",
  },
  {
    url: require("../../images/Night/snow-night.svg").default,
    day: false,
    type: "snow",
  },
  {
    url: require("../../images/Night/storm-night.svg").default,
    day: false,
    type: "storm",
  },
  {
    url: require("../../images/Night/fog-night.svg").default,
    day: false,
    type: "fog",
  },
];

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const imgSrc = WeatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });

  const imgSrcUrl = imgSrc[0].url || "";

  return (
    <section className="weather">
      <div className="weather__info">{weatherTemp}°F</div>
      <img src={imgSrcUrl} alt="weather bar" className="weather__image" />
    </section>
  );
};

export default WeatherCard;
