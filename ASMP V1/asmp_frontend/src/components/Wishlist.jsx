import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ASMP_GET_PREFS_URL = "http://127.0.0.1:8001/api/auth/get-preferences/";
const ASMP_SAVE_PREFS_URL = "http://127.0.0.1:8001/api/auth/save-preferences/";

function Wishlist() {
  const [preferences, setPreferences] = useState(["", "", "", "", ""]);
  const [user, setUser] = useState(null);
  const [existing, setExisting] = useState(false);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");

    if (!userDataString) {
      navigate("/");
      return;
    }

    try {
      const userData = JSON.parse(userDataString);
      setUser(userData);

      // ✅ Check if user already exists in database
      axios
        .post(ASMP_GET_PREFS_URL, { roll_number: userData.roll_number })
        .then((response) => {
          if (response.data.exists) {
            setExisting(true);
            setPreferences(response.data.preferences);
          }
        })
        .catch((error) =>
          console.error("❌ Error fetching preferences:", error)
        );
    } catch (error) {
      console.error("❌ Error parsing userData:", error);
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (index, value) => {
    const newPreferences = [...preferences];
    newPreferences[index] = value;
    setPreferences(newPreferences);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error("❌ No user found!");
      return;
    }

    console.log("📤 Sending Preferences:", {
      name: user.name,
      roll_number: user.roll_number,
      preferences,
    });

    try {
      const response = await axios.post(ASMP_SAVE_PREFS_URL, {
        name: user.name,
        roll_number: user.roll_number,
        preferences,
      });

      console.log("✅ Server Response:", response.data);
      alert(response.data.message);
      setExisting(true);
      setEditing(false); // ✅ Disable form after saving
    } catch (error) {
      console.error(
        "❌ Error saving preferences:",
        error.response?.data || error
      );
      alert("Error saving preferences.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {user ? (
        <>
          <h1>Wishlist for {user.name}</h1>

          {existing && !editing ? (
            <>
              <h3>Your saved preferences:</h3>
              <ul>
                {preferences.map((pref, index) => (
                  <li key={index}>{pref || "Not set"}</li>
                ))}
              </ul>
              <button onClick={() => setEditing(true)}>
                Change Preferences
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              {preferences.map((pref, index) => (
                <div key={index}>
                  <input
                    type="text"
                    placeholder={`Preference ${index + 1}`}
                    value={pref}
                    onChange={(e) => handleChange(index, e.target.value)}
                    required
                  />
                </div>
              ))}
              <button type="submit">Save Preferences</button>
            </form>
          )}
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default Wishlist;