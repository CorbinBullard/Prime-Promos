// ModalContext.js
import React, { createContext, useContext, useState } from "react";
import { Modal } from "antd";

const ModalContext = createContext();

export function useModal() {
  return useContext(ModalContext);
}

export const ModalProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState("");

  const openModal = (content, title = "") => {
    setContent(content);
    setTitle(title);
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
    setContent(null);
    setTitle("");
  };

  return (
    <ModalContext.Provider value={{ showModal: openModal, hideModal }}>
      {children}
      <Modal title={title} open={isVisible} onCancel={hideModal} >
        {content}
      </Modal>
    </ModalContext.Provider>
  );
};
