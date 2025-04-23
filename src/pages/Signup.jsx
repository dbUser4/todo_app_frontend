import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://todo-app-backend.onrender.com/api/auth/signup",
        {
          username,
          password,
        }
      );

      localStorage.setItem("token", res.data.token); // ✅ store token
      navigate("/dashboard"); // ✅ redirect to dashboard
    } catch (err) {
      alert("Signup failed: " + err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="form-control my-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
