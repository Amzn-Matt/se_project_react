import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

const LoginModal = ({ onCloseModal, onLogin, buttonText }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <ModalWithForm
      title="Login"
      onCloseModal={onCloseModal}
      buttonText={buttonText}
      onSubmit={handleSubmit}
    >
      <label className="modal__form-label">
        Email
        <input
          className="modal__form-input"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailInput}
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
          onChange={handlePasswordInput}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
