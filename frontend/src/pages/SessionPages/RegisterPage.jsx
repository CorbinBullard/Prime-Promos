import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function RegisterPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useParams();

  const registerUser = async () => {
    try {
      setLoading(true);
      await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      setLoading(false);
      alert("Registration successful");
    } catch (error) {
      setError(error.response.data);
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={registerUser} disabled={loading}>
        Register
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
