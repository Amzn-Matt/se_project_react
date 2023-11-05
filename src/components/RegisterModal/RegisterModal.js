import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

const RegisterModal = ({
  onCloseModal,
  buttonText,
  onSignUp,
  altButtonText,
  onAltButton,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp({ name, avatar, email, password });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      onCloseModal={onCloseModal}
      buttonText={buttonText}
      onSubmit={handleSubmit}
      altButtonText={altButtonText}
      onAltButton={onAltButton}
    >
      <label className="modal__form-label">
        Email
        <input
          className="modal__form-input"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>

      <label className="modal__form-label">
        Password
        <input
          className="modal__form-input"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>

      <label className="modal__form-label">
        Name
        <input
          className="modal__form-input"
          type="text"
          name="name"
          minLength="1"
          maxLength="100"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>

      <label className="modal__form-label">
        Avatar
        <input
          className="modal__form-input"
          type="url"
          name="avatar"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handlAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
