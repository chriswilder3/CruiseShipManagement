import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useUser } from "../../../contexts/UserContext";
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const { currentUser, loading: authLoading } = useAuth();
  const { userData, loading: userLoading } = useUser();

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

  if(currentUser.role === "Admin") {
    // Now lets try to fetch claims of all users.
    // For this we cant do it on just firebase auth. We need
    // The approval though backend.

    


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
        <div className="flex flex-col md:flex-row my-5 gap-5 poppins">
            <div className="flex flex-col gap-3 bg-gradient-to-tr from-slate-800 via-gray-600 to-slate-500 rounded p-5 shadow-lg">
                <h1 className="text-xl text-rose-500">
                    Guests awaiting approval : 10
                </h1>
                <button type="" className="p-2 my-2 bg-rose-500 text-white rounded-md ">
                   Add Voyager
                </button>

            </div>
            <div className="flex flex-col gap-3 bg-gradient-to-tr from-slate-800 via-gray-600 to-slate-500 rounded p-5 shadow-lg">
                <h1 className="text-xl text-rose-500">
                    Manage people on Celestia
                </h1>
                <button type="" className="p-2 my-2 bg-rose-500 text-white rounded-md ">
                   Manage people
                </button>
                
            </div>
        </div>
        

    </div>
    )
    }
}

export default AdminDashboard;
