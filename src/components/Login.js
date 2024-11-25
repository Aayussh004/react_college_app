import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Hardcoded credentials for both students and admin
  const students = [
    { id: 1, username: "student1", password: "password1" },
    { id: 2, username: "student2", password: "password2" },
    { id: 3, username: "student3", password: "password3" },
  ];

  const admin = { username: "admin", password: "admin123" };

  const handleLogin = () => {
    console.log("Entered Username:", username);
    console.log("Entered Password:", password);

    if (username === admin.username && password === admin.password) {
      console.log("Admin Login Successful");
      localStorage.setItem("loggedInUser", JSON.stringify({ type: "admin" }));
      navigate("/admin");
    } else {
      console.log("Students Array:", students);

      const student = students.find(
        (s) =>
          s.username.toLowerCase() === username.toLowerCase() &&
          s.password === password
      );

      console.log("Matched Student:", student);

      if (student) {
        console.log("Student Login Successful for:", student.username);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ type: "student", ...student })
        );
        navigate("/student");
      } else {
        console.log("Student not found! Credentials are invalid.");
        alert("Invalid credentials! Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <div className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;

