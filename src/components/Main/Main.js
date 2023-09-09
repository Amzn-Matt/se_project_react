import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import defaultClothingItems from "../../utils/Constants";
import ItemCard from "../ItemCard/ItemCard";

function Main({ onSelectCard }) {
  const weatherTemp = "75° F ";
  return (
    <main className="main">
      <WeatherCard day={true} type={"rainy"} weatherTemp={weatherTemp} />

      <section className="cards">
        <div className="cards__header">
          Today is {weatherTemp} / You may want to wear:
        </div>

        <div className="cards__list">
          {defaultClothingItems.map((items) => {
            return <ItemCard items={items} onSelectCard={onSelectCard} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default Main;
