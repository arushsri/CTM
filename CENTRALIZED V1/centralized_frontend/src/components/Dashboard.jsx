import { useEffect, useState } from "react";
import { getUserDetails } from "../api";

const ASMP_FRONTEND_URL = "http://localhost:3000";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      getUserDetails(token)
        .then((response) => setUser(response.data))
        .catch(() => alert("Session expired, please log in again."));
    }
  }, [token]);

  return (
    <div>
      {user ? (
        <>
          <h2>
            Welcome, {user.name} (Roll No: {user.roll_number})
          </h2>
          <button onClick={() => (window.location.href = ASMP_FRONTEND_URL)}>
            ASMP Website
          </button>
        </>
      ) : (
        <>
          <p>Please log in or register to continue.</p>
          <button onClick={() => (window.location.href = "/login")}>
            Login
          </button>
          <button onClick={() => (window.location.href = "/register")}>
            Register
          </button>
        </>
      )}
    </div>
  );
};

export default Dashboard;
