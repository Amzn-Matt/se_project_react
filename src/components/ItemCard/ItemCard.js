import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import likeButton from "../../images/Like button.svg";
import likeButtonFilled from "../../images/Like Button Filled.svg";

const ItemCard = ({ item, onSelectCard, onCardLike, isLoggedIn }) => {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser._id);
  const cardLikeButtonClass = `card__like-btn ${
    isLoggedIn ? "card__like-btn_visible" : "card__like-btn_hidden"
  }`;
  const cardLikeButtonImg = `${isLiked ? likeButtonFilled : likeButton}`;

  const handleCardClick = () => {
    onSelectCard(item);
  };

  const handleLikeClick = () => {
    onCardLike(item._id, isLiked, currentUser);
  };
  return (
    <li className="card">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={handleCardClick}
      />
      <p className="card__name">{item.name}</p>
      <img
        src={cardLikeButtonImg}
        className={cardLikeButtonClass}
        onClick={handleLikeClick}
      />
    </li>
  );
};

export default ItemCard;
