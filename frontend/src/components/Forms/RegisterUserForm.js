import { Divider, Flex, Form, Input, Button } from "antd";
import React from "react";
import ImageUploader from "../UI/ImageUploader";
import { LockOutlined } from "@ant-design/icons";
import { useSession } from "../../context/Session";
const { Item } = Form;

export default function RegisterUserForm({
  form,
  onValuesChange,
  initialValues,
}) {
  const { user } = useSession();

  const handleImageUpload = (url) => {
    form.setFieldsValue({ profileImageUrl: url });
    onValuesChange &&
      onValuesChange(
        { profileImageUrl: url },
        { ...form.getFieldsValue(), profileImageUrl: url }
      );
  };
  return (
    <Form initialValues={initialValues} form={form}>
      <Divider>
        <Item name="profileImageUrl">
          <ImageUploader
            buttonText={"Profile Image"}
            callback={handleImageUpload}
            initialUrl={initialValues?.profileImageUrl}
          />
        </Item>
      </Divider>
      <Item
        name="email"
        rules={[{ required: true, message: "Please enter your email" }]}
      >
        <Input type="email" placeholder="Email" disabled />
      </Item>
      <Flex gap={5}>
        <Item
          placeholder="First Name"
          name="firstName"
          rules={[{ required: true, message: "First Name is Required" }]}
        >
          <Input />
        </Item>
        <Item
          name="lastName"
          rules={[{ required: true, message: "Last Name is Required" }]}
        >
          <Input placeholder="Last Name" />
        </Item>
      </Flex>
      {!user && (
        <Item
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: "gray" }} />}
            type="password"
            placeholder="Password"
          />
        </Item>
      )}
    </Form>
  );
}
