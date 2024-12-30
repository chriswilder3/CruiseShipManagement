import React from 'react'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import { Outlet } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext';


function Layout() {
  return (

    <>
      <AuthContextProvider >
        <Header />
            <Outlet />
        <Footer />
      </AuthContextProvider>
    </>
  )
}

export default Layout