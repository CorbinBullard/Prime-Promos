import { DatePicker, Form, Input } from 'antd'
import React from 'react'

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
            <DatePicker />
        </Form.Item>
        <Form.Item label="Expected Delivery Date" name="expectedDeliveryDate">
            <DatePicker />
        </Form.Item>
    </Form>
  )
}
