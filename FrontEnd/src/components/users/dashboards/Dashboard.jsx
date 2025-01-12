import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import VoyagerDashboard from "./VoyagerDashboard";
import GuestDashboard from "./GuestDashboard";
import HeadCookDashboard from './HeadCookDashboard';
import SupervisorDashboard from "./SupervisorDashboard";
import ManagerDashboard from "./ManagerDashboard";

function Dashboard() {
  const { currentUser, loading: authLoading } = useAuth(); // Handle loading state for auth

  // Show a loading screen while `currentUser` is being fetched
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  // If no user is logged in, redirect to the sign-in page
  if (!currentUser) {
    return <Navigate to="/users/signin" />;
  }

  // Render the appropriate dashboard based on the user's role
  switch (currentUser.role) {
    case "Admin":
      return <AdminDashboard />;
    case "Voyager":
      return <VoyagerDashboard />;
    case "HeadCook":
      return <HeadCookDashboard />
    case "Supervisor":
      return <SupervisorDashboard />
    case "Manager":
      return <ManagerDashboard/>
    case "Guest":
      return <GuestDashboard />;
    default:
      return <GuestDashboard />;
  }
}

export default Dashboard;
