import { Button, Dropdown, Flex, Form, Modal, Typography } from "antd";
import React, { useState } from "react";
import UserIcon from "../Members/UserIcon";
import {
  DownOutlined,
  SettingOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { useSession } from "../../context/Session";
import RegisterUserForm from "../Forms/RegisterUserForm";
const { Title } = Typography;
export default function AccountDropdown() {
  const { user, logout, updateUser } = useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const items = [
    {
      label: "My Profile",
      key: "0",
      icon: <SettingOutlined />,
      onClick: () => setModalOpen(true),
    },
    {
      label: "Logout",
      key: "1",
      icon: <UserDeleteOutlined />,
      danger: true,
      onClick: logout,
    },
  ];
  const handleUpdateUser = () => {
    form.validateFields().then((values) => {
      console.log("values : ", values);
      updateUser(values);
      setModalOpen(false);
    });
  };
  console.log("user : ", user);
  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button
          type="text"
          style={{ height: "100%" }}
          children={
            <Flex align="center">
              <UserIcon user={user} />
              <Flex vertical>
                <Title level={5} style={{ margin: "0 1rem" }}>
                  Welcome,
                </Title>
                <Title level={5} italic style={{ margin: "0 1rem" }}>
                  {user?.firstName} {user?.lastName}
                </Title>
              </Flex>
              <DownOutlined />
            </Flex>
          }
        />
      </Dropdown>
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        width={300}
        okText="Update Profile"
        onOk={handleUpdateUser}
      >
        <RegisterUserForm initialValues={user} form={form} />
      </Modal>
    </>
  );
}
