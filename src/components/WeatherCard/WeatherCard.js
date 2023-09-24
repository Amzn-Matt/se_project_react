import { WeatherOptions } from "../../utils/Constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const imgSrc = WeatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });

  const imgSrcUrl = imgSrc[0]?.url || "";

  return (
    <section className="weather">
      <div className="weather__info">
        {weatherTemp}°{currentTemperatureUnit}
      </div>
      <img src={imgSrcUrl} alt="weather bar" className="weather__image" />
    </section>
  );
};

export default WeatherCard;
