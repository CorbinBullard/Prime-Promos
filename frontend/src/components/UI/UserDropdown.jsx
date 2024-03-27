import { Form, Select } from "antd";
import React, { useMemo } from "react";

export default function UserDropdown({
  options,
  defaultValue,
  mode,
  placeholder,
  label,
}) {
  const userOptions = useMemo(() => {
    return Object.values(options).map((member) => ({
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
      />
    </Form.Item>
  );
}
