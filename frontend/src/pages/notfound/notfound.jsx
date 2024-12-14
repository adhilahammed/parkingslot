import React from "react";
import { useNavigate } from "react-router";

function NotFoundPage() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-9xl font-extrabold text-blue-800">404</h1>
      <p className="text-2xl text-gray-600 mt-4">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button
        onClick={goHome}
        className="mt-6 px-6 py-2 text-white bg-blue-800 hover:bg-blue-800 rounded-lg shadow-md transition-all"
      >
        Go Back Home
      </button>
    </div>
  );
}

export default NotFoundPage;
