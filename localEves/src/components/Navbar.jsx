import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../values";

const Navbar = ({ isLoggedIn, setIsLoggedIn, role }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggedIn(false);
    setDropdownOpen(false);
    localStorage.setItem("isLoggedIn", false);

    toast.success("Logged out successfully!");
    await axios.post(
      `${SERVER_URL}/api/v1/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-[1000]">
      <div className="mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-500">
          LocalEves
        </Link>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 focus:outline-none">
                <CgProfile className="text-4xl" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                  <Link to={role === "ORGANISER" ? "/my-events" : "/registered-events"} className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>
                    My Events
                  </Link>
                  <Link to={role === "ORGANISER" ? "/post-event" : "/all-events"} className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>
                    {role === "ORGANISER" ? "Post Event" : "All Events"}
                  </Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                Login
              </Link>
              <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
