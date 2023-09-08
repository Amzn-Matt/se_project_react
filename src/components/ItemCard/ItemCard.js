const ItemCard = ({ items }) => {
  return (
    <div>
      <div>
        <img src={items.link} alt="Picture of Item" className="cards__image" />
      </div>

      <div className="cards__name">{items.name}</div>
    </div>
  );
};

export default ItemCard;
