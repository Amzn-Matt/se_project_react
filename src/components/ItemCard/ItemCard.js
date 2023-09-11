const ItemCard = ({ item, onSelectCard }) => {
  return (
    <li className="card">
      <img
        src={item.link}
        alt="Picture of Item"
        className="card__image"
        onClick={() => onSelectCard(item)}
      />
      <p className="card__name">{item.name}</p>
    </li>
  );
};

export default ItemCard;
