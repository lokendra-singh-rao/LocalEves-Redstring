import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../values";

const Signup = () => {
  // active component states
  const [signupActive, setSignupActive] = useState(true);

  // signup states
  const [fullname, setFullname] = useState("");
  const [role, setRole] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // verify otp states
  const [otpToken, setOtpToken] = useState("");
  const [otp, setOtp] = useState("");

  // error and success states
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Basic validation
    if (!fullname || !email || !password || !role || !dob) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post(`${SERVER_URL}/api/v1/auth/signup`, { fullname, role, dob, email, password });

      if (response.data.ok) {
        setSuccess(response.data.data.message);
        setOtpToken(response.data.data.otpToken);
        setTimeout(() => {
          setSignupActive(false);
          setSuccess("");
        }, 2000);
      } else {
        setError(response.data.err || "Signup failed!");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.err);
      } else {
        setError("An error occurred! Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!otp) {
      setError("Enter OTP");
      return;
    }

    try {
      const response = await axios.post(`${SERVER_URL}/api/v1/auth/verify-otp`, { otp, otpToken });

      if (response.data.ok) {
        setSuccess(response.data.data);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(response.data.err || "Signup failed!");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.err);
      } else {
        setError("An error occurred! Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {signupActive ? (
        <div className="bg-white px-8 py-4 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-2 text-center">Sign Up</h2>

          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                Name:
              </label>
              <input type="text" id="name" value={fullname} onChange={(e) => setFullname(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            <div className="mb-4">
              <label htmlFor="role" className="block text-gray-700 font-medium mb-1">
                Role:
              </label>
              <select onClick={(e) => setRole(e.target.selectedOptions[0].value)} className="block w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500" defaultValue="">
                <option value="" disabled>
                  Select Role
                </option>
                <option value="ORGANISER">Organiser</option>
                <option value="PARTICIPANT">Participant</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="role" className="block text-gray-700 font-medium mb-1">
                Date of Birth:
              </label>
              <input type="date" onChange={(e) => setDob(e.target.value)} className="block w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-500" required />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                Email:
              </label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            <div className="mb-1">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                Password:
              </label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            <div className="mb-1 min-h-6">
              {error && <div className="text-red-500">{error}</div>}
              {success && <div className="text-green-500">{success}</div>}
            </div>

            <button disabled={loading} type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
              {loading ? "Please wait..." : "Sign Up"}
            </button>

            <div className="float-right mt-2">
              Already have an Account ?{" "}
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white px-8 py-4 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-2 text-center">Verify Email</h2>
          <p className="text-center">Please enter the OTP sent to your email</p>

          <form onSubmit={handleVerifyEmail}>
            <div className="mt-4 mb-1">
              <input type="number" placeholder="Enter OTP" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            <div className="mb-1 min-h-6">
              {error && <div className="text-red-500">{error}</div>}
              {success && <div className="text-green-500">{success}</div>}
            </div>

            <button disabled={loading} type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
              {loading ? "Please wait..." : "Verify Otp"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Signup;
