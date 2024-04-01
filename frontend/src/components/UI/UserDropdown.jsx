import { Form, Select, Space, List, Flex } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import React, { useMemo } from "react";
import UserIcon from "../Members/UserIcon";

const renderItem = (option) => {
  const { data } = option;
  return (
    <Flex gap={10} align="center">
      <UserIcon user={data} size={"default"} />
      <Flex vertical>
        <strong>{data.label}</strong>
        <small>{data.email}</small>
      </Flex>
    </Flex>
  );
};

export default function UserDropdown({
  options,
  defaultValue,
  mode,
  placeholder,
  label,
}) {
  const userOptions = useMemo(() => {
    return Object.values(options).map((member) => ({
      ...member,
      label: `${member.firstName} ${member.lastName}`,
      value: member.id,
    }));
  }, [options]);

  return (
    <Form.Item name="users" label={label || ""}>
      <Select
        mode={mode || "multiple"}
        placeholder={placeholder || "Select Users"}
        options={userOptions}
        optionRender={renderItem}
      />
    </Form.Item>
  );
}
