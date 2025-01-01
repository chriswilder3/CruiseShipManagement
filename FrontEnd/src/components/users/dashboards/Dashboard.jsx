import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Navigate } from 'react-router-dom'
import AdminDashboard from './AdminDashboard';
import VoyagerDashboard from "./VoyagerDashboard";
import GuestDashboard from "./GuestDashboard";


function Dashboard() {
  const { currentUser,loading: authLoading  } = useAuth()

  if(loading){
    return <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900">
        <p className="text-lg font-semibold text-white">Loading...</p>
      </div>
  }else{

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
        <Navigate to='/users/signin'/>
    }


  }
}

export default Dashboard;
