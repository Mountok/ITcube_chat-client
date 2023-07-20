import React, { useState, useEffect} from "react";
import ConfirmRecoveryModal from "./ConfirmRecoveryModal";
import axios from 'axios';

const PasswordRecoveryForm = ({ onCancel }) => {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [emailPassword,setemailPassword] = useState("")

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(()=>{
    if(emailPassword.length != 0){
    console.log(emailPassword);

      fetchData(email,emailPassword)
    }
  },[emailPassword])
  const fetchData = async(email,emailPassword)=>{
    await axios.put("http://localhost:5000/rest-api/recoveryUserPass", {
      user_mail: email,
      password_from_email: emailPassword,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setemailPassword(Math.random().toString().split(".")[1].substr(0, 4));

    console.log("Email:", email);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleResendCode = () => {
    console.log("Отправка нового кода...");
    setemailPassword(Math.random().toString().split(".")[1].substr(0, 4));

  };

  return (
    <div className="password-recovery-form-container">
      <h2 className="password-recovery-form-title">Восстановление аккаунта</h2>
      <form onSubmit={handleSubmit}>
        <div className="password-recovery-form-field">
          <label
            htmlFor="recovery-email"
            className="password-recovery-form-label"
          >
            Email
          </label>
          <input
            type="email"
            id="recovery-email"
            value={email}
            onChange={handleEmailChange}
            className="password-recovery-form-input"
            required
          />
        </div>
        <div className="password-recovery-form-buttons">
          <button type="submit" className="password-recovery-form-button">
            Восстановить
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="password-recovery-form-button cancel"
          >
            Отмена
          </button>
        </div>
      </form>
      {showModal && (
        <ConfirmRecoveryModal
          email={email}
          emailPassword={emailPassword}
          onClose={handleCloseModal}
          onResendCode={handleResendCode}
        />
      )}
    </div>
  );
};

export default PasswordRecoveryForm;
