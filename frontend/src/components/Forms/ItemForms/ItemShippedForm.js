import { DatePicker, Form, Input } from 'antd'
import React from 'react'
import { dateFormat } from '../../../utils/constants';

export default function ItemShippedForm() {
  return (
    <Form>
      <Form.Item label="Tracking Number" name="trackingNumber">
        <Input />
      </Form.Item>
      <Form.Item label="Carrier" name="carrier">
        <Input />
      </Form.Item>
      <Form.Item label="Shipped Date" name="shippedDate">
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item label="Expected Delivery Date" name="expectedDeliveryDate">
        <DatePicker format={dateFormat} />
      </Form.Item>
    </Form>
  );
}
