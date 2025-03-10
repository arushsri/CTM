import { useState } from "react";
import { registerUser } from "../api";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    roll_number: "",
    hostel_number: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const response = await registerUser(formData);
      if (response.token) {
        localStorage.setItem("token", response.token);
        alert("User Registered Successfully!");
        window.location.href = "/";
      } else {
        alert("Registration successful, but login required.");
        window.location.href = "/login";
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      } else {
        alert("Error registering user.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" onChange={handleChange} />
      {errors.username && <p style={{ color: "red" }}>{errors.username[0]}</p>}

      <input name="first_name" placeholder="First Name" onChange={handleChange} />

      <input name="last_name" placeholder="Last Name" onChange={handleChange} />

      <input name="roll_number" placeholder="Roll Number" onChange={handleChange} />
      {errors.roll_number && <p style={{ color: "red" }}>{errors.roll_number[0]}</p>}

      <input name="hostel_number" placeholder="Hostel Number" onChange={handleChange} />

      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      {errors.password && <p style={{ color: "red" }}>{errors.password[0]}</p>}

      <button type="submit">Register</button>

      <p>Already Registered? Login Here</p>
      <button type="button" onClick={() => (window.location.href = "/login")}>
        Login
      </button>
    </form>
  );
};

export default Register;