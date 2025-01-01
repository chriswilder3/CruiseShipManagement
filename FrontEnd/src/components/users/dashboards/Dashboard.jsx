import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Navigate } from 'react-router-dom'
import AdminDashboard from './AdminDashboard';
import VoyagerDashboard from "./VoyagerDashboard";
import GuestDashboard from "./GuestDashboard";


function Dashboard() {
  const { currentUser,loading: authLoading  } = useAuth()

  

    if(!currentUser){
      return <Navigate to="/users/signin" />
    }

    switch( currentUser.role){
      case "Admin":
        return <AdminDashboard />
      case "Voyager":
        return <VoyagerDashboard />
      case "Guest":
        return <GuestDashboard />
      default:
        return <GuestDashboard />
  }
}

export default Dashboard;
