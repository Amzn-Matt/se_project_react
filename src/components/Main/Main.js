import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import defaultClothingItems from "../../utils/Constants";
import ItemCard from "../ItemCard/ItemCard";
import { useMemo } from "react";

function Main({ weatherTemp, onSelectCard }) {
  const weatherType = useMemo(() => {
    if (weatherTemp >= 86) {
      return "hot";
    } else if (weatherTemp >= 66 && weatherTemp <= 85) {
      return "warm";
    } else if (weatherTemp <= 65) {
      return "cold";
    }
  }, [weatherTemp]);

  const filteredCards = defaultClothingItems.filter((item) => {
    return item.weather.toLowerCase === weatherType;
  });

  console.log(filteredCards);

  return (
    <main className="main">
      <WeatherCard day={true} type={"rainy"} weatherTemp={weatherTemp} />

      <section className="cards">
        <div className="cards__header">
          Today is {weatherTemp}°F / You may want to wear:
        </div>

        <div className="cards__list">
          {defaultClothingItems.map((item) => (
            <ItemCard key={item._id} item={item} onSelectCard={onSelectCard} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
