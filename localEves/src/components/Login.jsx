import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn, setRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    // Basic validation
    if (!email || !password) {
      setError("Email and Password are required!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/v1/auth/login",
        { email, password },
        {
          withCredentials: true,
        }
      );
      if (response.data.ok) {
        setSuccess("Logged in successfully!");
        setIsLoggedIn(true);
        setRole(response.data.data.role);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", response.data.data.role);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setError(response.data.err || "Login failed!");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.err);
      } else {
        setError("An error occurred! Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email:
            </label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div className="mb-1">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password:
            </label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div className="mb-1 min-h-6">
            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">{success}</div>}
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Login
          </button>

          <div className="float-right mt-2">
            Don't have an Account ?{" "}
            <Link to="/signup" className="text-blue-600">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
