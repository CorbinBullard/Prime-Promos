import { Button, DatePicker, Form, Input, Space, Typography } from "antd";
import { SendOutlined } from "@ant-design/icons";
import React from "react";
import { dateFormat, formItemLayout } from "../../../utils/constants";
import { formatDateForForm } from "../../../utils/utilFunctions";
import useItems from "../../../hooks/useItems";
import { useSession } from "../../../context/Session";
import { useParams } from "react-router-dom";
import CompactItemLabel from "../../UI/CompactItemLabel";
import { csrfFetch } from "../../../utils/csrf";

const { Item } = Form;
export default function ItemShippedForm({
  form,
  onValuesChange,
  initialValues,
}) {
  const { projectId } = useParams();
  const { isAdmin } = useSession();
  const { currentProject } = useItems({ projectId });
  const formattedInitialValues = {
    ...initialValues,
    delivered: formatDateForForm(initialValues?.delivered),
  };
  const handleSendTracking = async () => {
    const tracking = form.getFieldValue("tracking");
    const item = form.getFieldValue("name");
    if (!tracking) return;
    const res = await csrfFetch("/api/email", {
      method: "POST",
      body: JSON.stringify({
        email: currentProject?.contactEmail,
        subject: "Tracking Number",
        text: `Your tracking number is: ${tracking} for item: ${item}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      form.setFieldsValue({ sentEmail: true });
    }
  };

  return (
    <Form
      form={form}
      onValuesChange={onValuesChange}
      initialValues={formattedInitialValues}
      {...formItemLayout}
      layout="vertical"
    >
      <CompactItemLabel>
        {initialValues?.sentEmail ? "Resend" : "Send"} Tracking Number to{" "}
        <Typography.Text strong>
          {currentProject?.contactEmail || "Client"}
        </Typography.Text>
      </CompactItemLabel>
      <Space.Compact style={{ width: "100%", marginBottom: "1rem" }}>
        <Button type="primary" onClick={handleSendTracking}>
          <SendOutlined />
        </Button>
        <Item name="tracking" noStyle>
          <Input
            style={{ width: "100%" }}
            placeholder="Enter Tracking Number"
          />
        </Item>
      </Space.Compact>
      <Item name="delivered" label="Delivery Date">
        <DatePicker style={{ width: "100%" }} format={dateFormat} />
      </Item>
    </Form>
  );
}
