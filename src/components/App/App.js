import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { useState } from "react";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleOpenModal = () => {
    setActiveModal("open");
  };
  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  console.log(selectedCard);
  return (
    <div>
      <Header onOpenModal={handleOpenModal} />
      <Main onSelectCard={handleSelectedCard} />
      {activeModal === "open" && (
        <ModalWithForm title="New garment" onCloseModal={handleCloseModal}>
          <label>
            Name
            <input
              type="text"
              name="name"
              minlength="1"
              maxlength="100"
              placeholder="Name"
              required
            />
          </label>

          <label>
            Image
            <input type="url" name="link" placeholder="Image URL" required />
          </label>
          <p>Select the weather type:</p>
          <div>
            <div>
              <input type="radio" id="hot" value="hot" />
              <label>Hot</label>
            </div>

            <div>
              <input type="radio" id="warm" value="warm" />
              <label>Warm</label>
            </div>

            <div>
              <input type="radio" id="cold" value="cold" />
              <label>Cold</label>
            </div>
          </div>
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal
          selectedCard={selectedCard}
          onCloseModal={handleCloseModal}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
