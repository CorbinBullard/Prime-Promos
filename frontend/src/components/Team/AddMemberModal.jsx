// InviteMemberForm.js
import React from "react";
import { Modal, Form, Input, Button } from "antd";
import AddMemberForm from "./AddMemberForm";

const AddMemberModal = ({ open, onInvite, onCancel }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Received values of form: ", values);
        onInvite(values); // Pass the form values up to the parent component
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      open={open}
      title="Invite Member"
      okText="Invite"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <AddMemberForm form={form} />
    </Modal>
  );
};

export default AddMemberModal;
