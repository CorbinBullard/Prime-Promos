import { Select } from 'antd';
import React from 'react'

export default function UserDropdown({ options, defaultValue, mode, placeholder}) {
  return (
    <Select
      defaultValue={defaultValue || []}
      mode={mode || "multiple"}
      placeholder={placeholder || "Select Users"}
      options={options}
    />
  );
}
