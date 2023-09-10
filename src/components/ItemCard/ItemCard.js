const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div>
      <div>
        <img
          src={item.link}
          alt="Picture of Item"
          className="cards__image"
          onClick={() => onSelectCard(item)}
        />
      </div>
      <div className="cards__name">{item.name}</div>
    </div>
  );
};

export default ItemCard;
