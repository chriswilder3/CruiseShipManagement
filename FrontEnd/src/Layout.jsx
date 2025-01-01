import React from 'react'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import { Outlet } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext';
import { UserContextProvider } from './contexts/UserContext';


function Layout() {
  return (

    <>
      <AuthContextProvider >
        <UserContextProvider>
          <Header />
            <Outlet />
          <Footer />
        </UserContextProvider>
      </AuthContextProvider>
    </>
  )
}

export default Layout