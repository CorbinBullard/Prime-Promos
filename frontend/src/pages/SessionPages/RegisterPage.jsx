import { Button, Input, Form, Flex, Card, Divider } from "antd";
import React, { useEffect, useState } from "react";
import { LockOutlined, WarningOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { csrfFetch } from "../../utils/csrf";
import { GoogleLogin } from "@react-oauth/google";
import { useSession } from "../../context/Session";
import ImageUploader from "../../components/UI/ImageUploader";
import NewUserForm from "../../components/Forms/RegisterUserForm";
const { Item } = Form;

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useSession();
  const [unvalidatedUser, setUnvalidatedUser] = useState({});
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
        setUnvalidatedUser(data);
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

  const handleGoogleSucess = async (response) => {
    try {
      setLoading(true);
      csrfFetch("/api/users/google-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ response, token }),
      })
        .then((res) => res.json())
        .then(() => {
          navigate("/login");
          setLoading(false);
        });
    } catch (error) {
      setError(error.response.data);
      setLoading(false);
    }
  };
  const handleGoogleFailure = (response) => {
    console.log(response);
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
      {!loading && unvalidatedUser ? (
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
          <NewUserForm form={form} initialValues={unvalidatedUser} />
          <Button block type="primary" onClick={registerUser}>
            Register
          </Button>
          <Divider>or</Divider>
          <GoogleLogin
            onSuccess={handleGoogleSucess}
            onError={handleGoogleFailure}
            text="signup_with"
            width={250}
          />
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
