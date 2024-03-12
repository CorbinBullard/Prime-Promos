import { Button, Input, Form, Flex, Card, Divider } from "antd";
import React, { useEffect, useState } from "react";
import { LockOutlined, WarningOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { csrfFetch } from "../../utils/csrf";
const { Item } = Form;

export default function RegisterPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { token } = useParams();

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      try {
        const response = await csrfFetch(`/api/users/register/${token}`);
        if (!response.ok) throw new Error("Network response was not ok.");
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }
    getUser();
  }, [token]);

  const registerUser = async () => {
    try {
      setLoading(true);
      form.validateFields().then((values) => {
        csrfFetch("/api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...values, token }),
        })
          .then((res) => res.json())
          .then(() => {
            navigate("/login");
            setLoading(false);
          });
      });
    } catch (error) {
      setError(error.response.data);
      setLoading(false);
    }
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        background: "gray",
      }}
    >
      {!loading && user ? (
        <Card
          title="Register Prime Promo Account"
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
          <Form initialValues={user} form={form}>
            <Item
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input type="email" placeholder="Email" disabled />
            </Item>
            <Flex gap={5}>
              <Item
                name="firstName"
                rules={[{ required: true, message: "First Name is Required" }]}
              >
                <Input />
              </Item>
              <Item
                name="lastName"
                rules={[{ required: true, message: "Last Name is Required" }]}
              >
                <Input />
              </Item>
            </Flex>
            <Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "gray" }} />}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Item>
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                onClick={registerUser}
              >
                Register
              </Button>
            </Item>
          </Form>
        </Card>
      ) : (
        <Card
          title={"Invalid Login"}
          extra={<WarningOutlined style={{ fontSize: "20px", color: "red" }} />}
          style={{
            width: 300,
            height: 300,
            position: "absolute",
            margin: "auto",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <p>
            Either the link is invalid or the user has already been registered.
          </p>
          <Divider />
          <p>If you believe this is an error, please contact support.</p>
        </Card>
      )}
    </div>
  );
}
