import "../Profile/Profile.css";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";
function Profile({ defaultClothingItems, onSelectCard, onOpenModal }) {
  return (
    <main className="profile">
      <SideBar />
      <ClothesSection
        defaultClothingItems={defaultClothingItems}
        onSelectCard={onSelectCard}
        onOpenModal={onOpenModal}
      />
    </main>
  );
}

export default Profile;
