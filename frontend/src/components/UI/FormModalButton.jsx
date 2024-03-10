import React, { useState } from "react";
import { Modal, Button, Form } from "antd";

const FormModalButton = ({
  children,
  icon,
  form: FormComponent,
  onSubmit,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsVisible(true);
  };

  const handleOk = async () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Received values of form: ", values);
        // setIsVisible(false);
        onSubmit(values) // Assuming onSubmit now returns a Promise.
          .then(() => {
            setIsVisible(false); // Move inside then to ensure it happens after async actions.
            form.resetFields(); // Same here, reset only after async actions complete.
          })
          .catch((error) => {
            // Handle or log the error if onSubmit (addMember) fails.
            console.error("Submission failed", error);
          });;
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} icon={icon}>
        {children}
      </Button>
      <Modal
        title="Form"
        open={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        {...props}
      >
        <FormComponent onFormSubmit={handleOk} form={form} />
      </Modal>
    </>
  );
};

export default FormModalButton;
