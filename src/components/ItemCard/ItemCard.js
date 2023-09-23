const ItemCard = ({ item, onSelectCard }) => {
  return (
    <li className="card">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={() => onSelectCard(item)}
      />
      <p className="card__name">{item.name}</p>
    </li>
  );
};

export default ItemCard;
