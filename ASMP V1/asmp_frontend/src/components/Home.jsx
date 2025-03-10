import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");

    if (!userDataString) {
      navigate("/"); // Redirect to login if no user found
      return;
    }

    try {
      const userData = JSON.parse(userDataString);
      setUser(userData);
    } catch (error) {
      console.error("❌ Error parsing userData:", error);
      navigate("/");
    }
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {user ? (
        <>
        <h1>Welcome {user.name} (Roll No: {user.roll_number})</h1>
        <button onClick={() => navigate("/wishlist")}>Go to Wishlist</button>
      </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default Home;