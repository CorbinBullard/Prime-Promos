import React from "react";
import { Form, Button } from "antd";
import InviteUserForm from "../../../Forms/InviteUserForm";
import { useTeam } from "../../../../context/useTeam";

export default function UserDetailsTab({ user }) {
  const { updateMember } = useTeam();
  const [form] = Form.useForm();
  const handleUpdateUser = () => {
    form.validateFields().then((values) => {
      updateMember({ ...user, ...values });
    });
  };

  return (
    <>
      <InviteUserForm form={form} initialValues={user} />
      <Button block onClick={handleUpdateUser} type="primary">
        Update User
      </Button>
    </>
  );
}
