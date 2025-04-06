import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalType, setModalType] = useState(null);

  const openModal = (content, type) => {
    setIsModalOpen(true);
    setModalContent(content);
    setModalType(type);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setModalType(null);
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, openModal, closeModal, modalContent, modalType }}
    >
      {children}
      {isModalOpen && modalContent}
    </ModalContext.Provider>
  );
};
