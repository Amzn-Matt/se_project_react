import "../Profile/Profile.css";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";
function Profile({ clothingItems, onSelectCard, onOpenModal }) {
  return (
    <main className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        onSelectCard={onSelectCard}
        onOpenModal={onOpenModal}
      />
    </main>
  );
}

export default Profile;
