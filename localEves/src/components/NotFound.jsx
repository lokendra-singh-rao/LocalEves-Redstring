import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-500 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-8">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
