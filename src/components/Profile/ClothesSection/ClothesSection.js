import "./ClothesSection.css";
import ItemCard from "../../ItemCard/ItemCard";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import { useContext } from "react";

const ClothesSection = ({ clothingItems, onSelectCard, onOpenModal }) => {
  const currentUser = useContext(CurrentUserContext);
  const currentItems = clothingItems.filter((item) => {
    return item.owner === currentUser._id;
  });

  return (
    <section className="clothes-section">
      <div className="clothes-section__container">
        <h3 className="clothes-section__title">Your Items</h3>
        <button
          className="clothes-section__btn"
          type="text"
          onClick={onOpenModal}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__cards">
        {currentItems.map((item) => (
          <ItemCard key={item._id} item={item} onSelectCard={onSelectCard} />
        ))}
      </ul>
    </section>
  );
};

export default ClothesSection;
