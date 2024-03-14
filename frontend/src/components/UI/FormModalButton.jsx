import React, { useState } from "react";
import { Modal, Button, Form } from "antd";

const FormModalButton = ({
  children,
  icon,
  form: FormComponent,
  onSubmit, // This now expects a function that returns a Promise, e.g., addMember.mutateAsync
  submitText,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false); // State to manage submitting status

  const showModal = () => {
    setIsVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields(); // Attempt to validate fields
      console.log("Received values of form: ", values);
      setSubmitting(true); // Indicate start of submission process
      await onSubmit(values); // Wait for submission to complete
      // If successful:
      setIsVisible(false); // Close modal
      form.resetFields(); // Reset form fields
    } catch (error) {
      // If validation fails, the error will be caught here
      console.error("Submission failed", error);
    } finally {
      setSubmitting(false); // Reset submitting status regardless of outcome
    }
  };

  const handleCancel = () => {
    if (!submitting) {
      // Prevent closing if submitting
      setIsVisible(false);
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        icon={icon}
        disabled={submitting}
      >
        {children}
      </Button>
      <Modal
        title={props.title || "Form"} // You can pass a title prop for customization
        open={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={submitText || "Submit"}
        confirmLoading={submitting} // Ant Design's Modal property to indicate loading state
        {...props}
      >
        <FormComponent form={form} />
      </Modal>
    </>
  );
};

export default FormModalButton;
