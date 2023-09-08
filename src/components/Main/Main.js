import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import defaultClothingItems from "../../Utils/Constants";
import ItemCard from "../ItemCard/ItemCard";

function Main() {
  return (
    <main>
      <WeatherCard />

      <section className="cards">
        <div className="cards__header">
          Today is 75° F / You may want to wear:
        </div>

        <div className="cards__list">
          {defaultClothingItems.map((items) => {
            console.log(items);

            return <ItemCard items={items} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default Main;
