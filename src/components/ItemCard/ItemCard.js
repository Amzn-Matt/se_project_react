const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div className="card">
      <img
        src={item.link}
        alt="Picture of Item"
        className="card__image"
        onClick={() => onSelectCard(item)}
      />
      <p className="card__name">{item.name}</p>
    </div>
  );
};

export default ItemCard;
