import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useUser } from "../../../contexts/UserContext";

function AdminDashboard() {
  const { currentUser, loading: authLoading } = useAuth();
  const { userData, loading: userLoading } = useUser();

  const toggleVoyagerPopup = () => {
    const popup = document.querySelector(".voyager-popup");
    popup.classList.toggle("hidden");
    popup.classList.toggle("block");
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900">
        <p className="text-lg font-semibold text-white">You are not logged in.</p>
      </div>
    );
  }

  if (authLoading || userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900">
        <p className="text-lg font-semibold text-white">Loading...</p>
      </div>
    );
  }

  if (currentUser.role === "Admin") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-300 via-indigo-200 to-blue-100 flex flex-col items-center py-10">
        {/* User Info Section */}
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-indigo-600 mb-4 text-center capitalize">
            {currentUser.role} Dashboard
          </h1>
          <div className="text-center">
            <p className="text-lg text-gray-700 mb-2">
              Welcome, <span className="font-semibold text-indigo-600">{currentUser.email}</span>!
            </p>
            <p className="text-lg text-gray-700">
              Your role is <span className="font-semibold text-indigo-600">{currentUser.role}</span>.
            </p>
          </div>
        </div>

        {/* Role-Specific Content */}
        <div className="relative">
          {/* Popup */}
          <div className="voyager-popup hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4 text-center">
              Approve Voyagers
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-700">Guest Name: John Doe</p>
                  <p className="text-sm text-gray-700">Guest Email: john@example.com</p>
                </div>
                <button
                  className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600"
                >
                  Add Voyager
                </button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-700">Guest Name: Jane Doe</p>
                  <p className="text-sm text-gray-700">Guest Email: jane@example.com</p>
                </div>
                <button
                  className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600"
                >
                  Add Voyager
                </button>
              </div>
            </div>
            <button
              onClick={toggleVoyagerPopup}
              className="w-full mt-6 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>

        {/* Dashboard Actions */}
        <div className="flex flex-col md:flex-row my-5 gap-5 poppins">
          <div className="flex flex-col gap-3 bg-gradient-to-tr from-slate-800 via-gray-600 to-slate-500 rounded p-5 shadow-lg">
            <h1 className="text-xl text-rose-500">Guests awaiting approval: 10</h1>
            <button
              type="button"
              onClick={toggleVoyagerPopup}
              className="p-2 my-2 bg-rose-500 text-white rounded-md hover:bg-rose-600"
            >
              View Details 
            </button>
          </div>
          <div className="flex flex-col gap-3 bg-gradient-to-tr from-slate-800 via-gray-600 to-slate-500 rounded p-5 shadow-lg">
            <h1 className="text-xl text-rose-500">Manage people on Celestia</h1>
            <button
              type="button"
              className="p-2 my-2 bg-rose-500 text-white rounded-md hover:bg-rose-600"
            >
              Manage People
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default AdminDashboard;
