import { useState, useEffect } from "react";
import { loginUser } from "../api";

const CENTRALIZED_BACKEND_URL = "http://127.0.0.1:8000/api/auth/validate/";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(true); // To prevent flickering on page load
  const [error, setError] = useState("");

  const validateToken = async (token) => {
    try {
      await axios.get(CENTRALIZED_BACKEND_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("✅ Token is valid, redirecting...");
      window.location.href = "/"; // Redirect to home
    } catch (error) {
      console.warn("❌ Token expired or invalid, clearing storage...");
      localStorage.removeItem("token"); // Remove expired token
      setLoading(false); // Show login form
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      validateToken(token)
    } else {
      setLoading(false); // Allow login form if no token exists
    }
  }, []);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser(credentials);
      localStorage.setItem("token", response.data.access); // Store new token
      alert("Login Successful!");
      window.location.href = "/"; // Redirect after login
    } catch (error) {

      console.error(
        "❌ Login error:",
        error.response?.data?.error || "Login failed"
      );

      setError(error.response?.data?.error[0] || "Login failed");
    }
  };

  return (
    <div>
      {loading ? (
        <p>Checking session...</p> // Show loading until token validation completes
      ) : (
        <>
          <h1>Centralized Login</h1>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input name="username" placeholder="Username" onChange={handleChange} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <button type="submit">Login</button>
            <p>Haven't Registered? Register Here</p>
            <button type="button" onClick={() => (window.location.href = "/register")}>
              Register
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;