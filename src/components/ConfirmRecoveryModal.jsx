import React, { useState, useEffect } from "react";
import "./ConfirmRecoveryModal.css";

const ConfirmRecoveryModal = ({emailPassword, email, onClose, onResendCode }) => {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCountdownActive, setIsCountdownActive] = useState(true);
  const [countdown, setCountdown] = useState(10);
  const [resendCount, setResendCount] = useState(0);
  const [maxResendCount, setMaxResendCount] = useState(3);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSendCode = async () => {
    if (resendCount >= maxResendCount) {
      setErrorMessage("Извините, слишком много запросов. Попробуйте позже.");
      return;
    }

    try {
      onResendCode();
      setIsCountdownActive(true);
      setCountdown(getCountdownDuration(resendCount));
      setResendCount((prevCount) => prevCount + 1);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        "Произошла ошибка при отправке кода. Попробуйте еще раз."
      );
    }
  };

  const handleClose = () => {
    onClose();
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
    // логика для проверки введенного кода и пароля
    if(code == emailPassword){
      console.log("Введенный код:", code);
      console.log("Новый пароль:", newPassword);
      console.log("Подтверждение пароля:", confirmPassword);  
    }else{
      console.log('не верный пароль')
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
    <div className="confirm-recovery-modal">
      <div className="confirm-recovery-modal-content">
        <h2 className="confirm-recovery-modal-title">
          Восстановление аккаунта
        </h2>
        <div className="confirm-recovery-modal-action">
          <input
            type="text"
            value={code}
            onChange={handleCodeChange}
            className="confirm-recovery-modal-input"
            placeholder="Введите код восстановления"
            required
          />
          <input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            className="confirm-recovery-modal-input"
            placeholder="Введите новый пароль"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="confirm-recovery-modal-input"
            placeholder="Подтвердите новый пароль"
            required
          />
          <button
            className="confirm-recovery-modal-button"
            onClick={handleSubmit}
          >
            Подтвердить
          </button>
        </div>
        <p className="confirm-recovery-modal-resend">
          Выслать новый код можно будет через:{" "}
          {isCountdownActive ? `${countdown} секунд` : ""}
        </p>
        {!isCountdownActive && (
          <a
            href="#"
            onClick={handleSendCode}
            className="confirm-recovery-modal-resend-link"
          >
            Выслать новый код
          </a>
        )}
        {errorMessage && (
          <p className="confirm-recovery-modal-error">{errorMessage}</p>
        )}
        <button className="confirm-recovery-modal-close" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default ConfirmRecoveryModal;
