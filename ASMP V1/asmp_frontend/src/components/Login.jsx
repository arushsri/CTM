import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ASMP_BACKEND_LOGIN_URL = "http://127.0.0.1:8001/api/auth/login/";
const CENTRALIZED_FRONTEND_URL = "http://localhost:5173/";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(ASMP_BACKEND_LOGIN_URL, {
        username,
        password,
      });
      const userData = response.data.user;

      console.log("✅ Login successful:", userData);

      localStorage.setItem("userData", JSON.stringify(userData)); // Store user details

      navigate("/home");
    } catch (error) {
      console.error(
        "❌ Login error:",
        error.response?.data?.error[0] || "Login failed"
      );

      setError(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>ASMP Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <a
          href={CENTRALIZED_FRONTEND_URL}
          style={{ textDecoration: "underline" }}
        >
          Register
        </a>
      </p>
    </div>
  );
}

export default Login;
