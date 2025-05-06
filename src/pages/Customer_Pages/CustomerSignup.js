import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateName = (value) => {
    const nameRegex = /^[a-zA-Z\s]+$/; // Only alphabets and spaces
    if (!nameRegex.test(value)) {
      setNameError("Name should only contain alphabets and spaces.");
    } else {
      setNameError("");
    }
  };

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

  const handleSignup = async (e) => {
    e.preventDefault();

    if (nameError || emailError || passwordError || !name || !email || !password) {
      alert("Please fix the errors before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        "https://inventory-management-rest-api-mongo-db.onrender.com/api/customers/register",
        {
          name,
          email,
          password,
        }
      );

      if (response.status === 201) {
        alert("Signup Successful! Please login.");
      }
    } catch (error) {
      alert("Signup Failed! Customer registered successfully. Just Login");
    } finally {
      navigate("/customer-login"); // Redirect to login page after signup attempt
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh", position: "relative" }}
    >
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
        Welcome to{" "}
        <span style={{ color: "rgb(0, 123, 255)" }}>Inventory Hub</span>
      </h1>
      <div
        className="card p-4"
        style={{
          width: "500px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      >
        <h2
          className="text-center"
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "rgb(51, 51, 51)",
          }}
        >
          Customer Signup
        </h2>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                validateName(e.target.value);
              }}
              required
            />
            {nameError && <small className="text-danger">{nameError}</small>}
          </div>
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
          <button type="submit" className="btn btn-success w-100 mb-2">
            Signup
          </button>
          <div className="text-center mb-2" style={{ color: "black" }}>
            OR
          </div>
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={() => navigate("/customer-login")}
          >
            Login
          </button>
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

export default Signup;
