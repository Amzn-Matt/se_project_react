import "../Profile/Profile.css";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";
function Profile({
  clothingItems,
  onSelectCard,
  onOpenModal,
  onEditProfile,
  onLogout,
}) {
  return (
    <main className="profile">
      <SideBar onEditProfile={onEditProfile} onLogout={onLogout} />
      <ClothesSection
        clothingItems={clothingItems}
        onSelectCard={onSelectCard}
        onOpenModal={onOpenModal}
      />
    </main>
  );
}

export default Profile;
