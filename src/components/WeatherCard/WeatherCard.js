const WeatherCard = () => {
  return (
    <section className="weather">
      <div className="weather__info">75F</div>
      <img
        src={require("../../Images/Day/rainy.svg").default}
        alt="weather image"
        className="weather__image"
      />
    </section>
  );
};

export default WeatherCard;
