import { Button, Card, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { csrfFetch } from "../../utils/csrf";

export default function LoginPage({ user, login }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  async function handleLogin(form) {
    const response = await csrfFetch("/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      const data = await response.json();
      login(data.user);
      navigate("/");
    } else {
      setErrors(true);
    }
  }
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        background: "gray",
      }}
    >
      <Card
        title="Login to Prime Promo Account"
        style={{
          width: 300,
          height: "fit-content",
          position: "absolute",
          margin: "auto",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Form onFinish={handleLogin}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your Email" }]}
          >
            <Input type="email" placeholder="example@email.com" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your Password" }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "gray" }} />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
        {errors && <p style={{ color: "red" }}>Invalid Login</p>}
      </Card>
    </div>
  );
}
