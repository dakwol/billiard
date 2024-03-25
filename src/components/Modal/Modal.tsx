import React, { FC, useEffect } from "react";
import "./styles.scss";

interface ModalProps {
  content: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ content, onClose, isOpen }) => {
  useEffect(() => {
    isOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [isOpen]);

  return (
    <>
      <div
        className={`modalContainerBg ${isOpen && "active"}`}
        onClick={onClose}
      ></div>
      <div className={`modal ${isOpen && "active"}`}>{content}</div>
    </>
  );
};

export default Modal;
