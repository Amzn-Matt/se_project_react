import "../Profile/Profile.css";
import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";
function Profile({
  clothingItems,
  onSelectCard,
  onOpenModal,
  onEditProfile,
  onLogout,
  isLoggedIn,
  onCardLike,
}) {
  return (
    <main className="profile">
      <SideBar onEditProfile={onEditProfile} onLogout={onLogout} />
      <ClothesSection
        clothingItems={clothingItems}
        onSelectCard={onSelectCard}
        onOpenModal={onOpenModal}
        isLoggedIn={isLoggedIn}
        onCardLike={onCardLike}
      />
    </main>
  );
}

export default Profile;
