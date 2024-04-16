import { Button, Card, Divider, Form, Input, Typography } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import { LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../context/Session";
import { GoogleLogin } from "@react-oauth/google";
import Loader from "../../components/UI/Loader";
const { Paragraph } = Typography;

export default function LoginPage() {
  const { user, login, error, isLoading, loginGoogle } = useSession();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  async function handleLogin(form) {
    login(form);
    if (!isLoading && !error) {
      navigate("/");
    }
  }
  const handleGoogleSucess = async (response) => {
    loginGoogle(response);
    if (!isLoading && !error) {
      navigate("/");
    }
  };
  const handleGoogleFailure = (response) => {
    console.log(response);
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Suspense fallback={<Loader />}>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "relative",
          background: "gray",
        }}
      >
        <Card
          bordered={false}
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
              rules={[
                { required: true, message: "Please enter your Password" },
              ]}
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
          <Divider>or</Divider>
          <GoogleLogin
            onSuccess={handleGoogleSucess}
            onError={handleGoogleFailure}
            width={250}
          />
          {error && (
            <Paragraph style={{ color: "red" }}>Invalid Login</Paragraph>
          )}
        </Card>
      </div>
    </Suspense>
  );
}
