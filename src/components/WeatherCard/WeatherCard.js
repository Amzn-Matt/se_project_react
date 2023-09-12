// import { useMemo } from "react";
import { WeatherOptions } from "../../utils/Constants";

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
