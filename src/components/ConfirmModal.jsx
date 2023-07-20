import React, { useState, useEffect } from "react";
import "./ConfirmModal.css";

const ConfirmModal = ({ email, emailPassword,onClose, onResendCode }) => {
  const [code, setCode] = useState("");
  const [isCountdownActive, setIsCountdownActive] = useState(true);
  const [countdown, setCountdown] = useState(10);
  const [resendCount, setResendCount] = useState(0); 
  const [maxResendCount, setMaxResendCount] = useState(3); 
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

 const handleSendCode = async () => {
  if (resendCount >= maxResendCount) {
    setErrorMessage("Извините, слишком много запросов. Попробуйте позже.");
    return;
  }

  try {
    onResendCode()
    setIsCountdownActive(true);
    setCountdown(getCountdownDuration(resendCount));
    setResendCount((prevCount) => prevCount + 1);
    setErrorMessage("");
  } catch (error) {
    setErrorMessage("Произошла ошибка при отправке кода. Попробуйте еще раз.");
  }
};

  useEffect(() => {
    let countdownTimer = null;
    if (isCountdownActive) {
      countdownTimer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(countdownTimer);
    };
  }, [isCountdownActive]);

  useEffect(() => {
    if (countdown === 0) {
      setIsCountdownActive(false);
    }
  }, [countdown]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // логика для проверки введенного кода
    console.log(emailPassword)
    if(code === emailPassword){
      console.log(true)
    }
  };

  const getCountdownDuration = (resendCount) => {
    if (resendCount === 0) {
      return 30;
    } else if (resendCount === 1) {
      return 120;
    } else if (resendCount === 2) {
      return 300;
    } else {
      return 600;
    }
  };

  return (
    <div className="confirm-modal">
      <div className="confirm-modal-content">
        <h2 className="confirm-modal-title">Подтверждение электронной почты</h2>
        <p>
          Ваш код отправлен на почту{" "}
          <i className="confirm-modal-user-mail">{email}</i>.
        </p>
        <div className="confirm-modal-action">
          <input
            type="text"
            value={code}
            onChange={handleCodeChange}
            className="confirm-modal-input"
            placeholder="Введите код"
            required
          />
          <button className="confirm-modal-button" onClick={handleSubmit}>
            Подтвердить
          </button>
        </div>
        <p className="confirm-modal-resend">
          Выслать новый код можно будет через:{" "}
          {isCountdownActive ? `${countdown} секунд` : ""}
        </p>
        {!isCountdownActive && (
          <a href="#" onClick={handleSendCode} className="confirm-modal-resend-link">
            Выслать новый код
          </a>
        )}
        {errorMessage && <p className="confirm-modal-error">{errorMessage}</p>}
        <button className="confirm-modal-close" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
