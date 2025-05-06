import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SupplierLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[a-zA-Z]{5,})(?=.*\d{3,})(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{9,}$/;
    // At least 5 alphabets, 3 numbers, 1 special character, and minimum 9 characters total
    if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password must contain at least 5 alphabets, 1 special character, 3 numbers, and be at least 9 characters long."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (emailError || passwordError || !email || !password) {
      alert("Please fix the errors before submitting.");
      return;
    }

    try {
      const response = await axios.post("https://inventory-management-rest-api-mongo-db.onrender.com/api/suppliers/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token; // Assuming the token is in the response data
        localStorage.setItem("supplier-jwtToken", token); // Save token in localStorage
        console.log("Token saved:", token); // Log the token to the console
        alert("Login Successful!");
        navigate("/supplier-dashboard"); // Redirect to dashboard
      }
    } catch (error) {
      alert("Invalid Credentials!");
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh", position: "relative" }}>
      <h1
        className="mb-4 fw-bold text-center"
        style={{
          fontSize: "2.5rem",
          color: "rgb(51, 51, 51)",
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "5px",
          cursor: "pointer", // Add pointer cursor for clickable text
        }}
        onClick={() => navigate("/")} // Redirect to landing page on click
      >
        Welcome to <span style={{ color: "rgb(0, 123, 255)" }}>Inventory Hub</span>
      </h1>
      <div className="card p-4" style={{ width: "500px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "10px" }}>
        <h2 className="text-center" style={{ fontSize: "2rem", fontWeight: "bold", color: "rgb(51, 51, 51)" }}>
          Supplier Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              required
            />
            {emailError && <small className="text-danger">{emailError}</small>}
          </div>
          <div className="mb-3">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              required
            />
            {passwordError && <small className="text-danger">{passwordError}</small>}
          </div>
          <button type="submit" className="btn btn-success w-100">Login</button>
        </form>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          color: "black",
          fontSize: "0.9rem",
        }}
      >
        Made by Soumyojyoti Saha
      </div>
    </div>
  );
}

export default SupplierLogin;
