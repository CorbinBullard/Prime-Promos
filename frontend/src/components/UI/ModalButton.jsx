import { Button, Modal } from "antd";
import React, { useState } from "react";

export default function ModalButton({
  children,
  ModalComponent,
  modalTitle,
  modalComponentProps,
  cancelText,
  okText,
  buttonType,
}) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Button onClick={() => setOpenModal(true)} type={buttonType || "primary"}>
        {children}
      </Button>
      <Modal
        open={openModal}
        title={modalTitle}
        cancelText={cancelText || "Cancel"}
        okText={okText || "Submit"}
        onCancel={() => setOpenModal(false)}
      >
        <ModalComponent {...modalComponentProps} />
      </Modal>
    </>
  );
}
