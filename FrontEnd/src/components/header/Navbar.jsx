import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import NavbarDropDown from './NavbarDropDown';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useUser } from '../../contexts/UserContext';


function Navbar() {
  const [serviceDropDown, setServiceDropDown] = useState('hidden');
  const [userDropdown, setUserDropdown] = useState(false);
  const [mobileMenuOpen, SetMobileMenuOpen] = useState(false);
  const { currentUser,loading:authLoading } = useAuth();
  const { userData, loading:userLoading } = useUser();
  const [cartContents, setCartContents ] = useState()

  useEffect(()=>{
    if(userData){
      setCartContents(userData.cart)
    }
  },[userData])

  const toggleUserDropdown = () => setUserDropdown((prev) => !prev);
  const handleMobileMenuOpen = () => SetMobileMenuOpen((prev) => !prev)
  const handleMobileMenuClose = () => {
    setTimeout( () =>{
      SetMobileMenuOpen(false)
    },1000)
  }

  const handleClickCartBtn = () => {
    
    console.log("userData : ",userData);
    console.log("userLoading : ",userLoading);
    console.log("cart Contents : ", cartContents);
      
  }
  
  
  return (
    <div onMouseLeave={handleMobileMenuClose}>

        <svg xmlns="http://www.w3.org/2000/svg" onClick={handleMobileMenuOpen} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 font-medium my-2 ml-1 text-blue-600 hover:text-slate-400 sm:hidden">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        </svg>
      
    <ul className={`sm:flex sm:flex-row  ${mobileMenuOpen?"flex-col":"hidden"} gap-20 mb-10 items-center px-16 pt-6 pb-1 text-blue-700 text-xl font-medium poppins`}>
      <li>
        <NavLink to="/" className={({ isActive }) => `${isActive ? 'text-slate-800' : ''}`}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={({ isActive }) => `${isActive ? 'text-slate-800' : ''}`}>
          About
        </NavLink>
      </li>

      {/* Services DropDown  */}

      <li
        onMouseEnter={() => setServiceDropDown('inline')}
        onMouseLeave={() => setServiceDropDown('hidden')}
        className="relative"
      >
        <NavLink to="/services" className={({ isActive }) => `${isActive ? 'text-slate-800' : ''}`}>
          Services
        </NavLink>
        <div
          className={`navbar-drop-down absolute z-10 transition-all delay-100 ease-in-out 
                        left-24 md:-left-16 top-7 ${serviceDropDown}`}
        >
          <NavbarDropDown />
        </div>
      </li>

      <li >
        <NavLink to="/contact" className={({ isActive }) => `${isActive ? 'text-slate-800' : ''}`}>
          Contact
        </NavLink>
      </li>

      {/* Cart Btn  */}
      <li className="ml-auto">
        <button onClick={handleClickCartBtn} className='text-slate-800'>
          <i className="text-slate-800 fa badge fa-lg"  > &#xf07a;</i>
        </button>
      </li>


      {currentUser ? (
        <li className="relative">
          <button
            type="button"
            onClick={toggleUserDropdown}
            className="text-slate-100 hidden w-12 h-12 rounded-full bg-blue-700 sm:flex items-center justify-center"
          >
            {currentUser.email.slice(0, 2)}
          </button>
          <button
            type="button"
            onClick={toggleUserDropdown}
            className="text-blue-600 sm:hidden text-center mx-auto flex items-center justify-center"
          >
            {currentUser.email.slice(0,currentUser.email.length-4)}
          </button>
          {userDropdown && (
            <div
             onMouseLeave={toggleUserDropdown} className="absolute md:right-0 mt-2 w-40 bg-slate-100 shadow-lg rounded-lg py-2 z-50"
            >
              <UserDropdownDiv />
            </div>
          )}
        </li>
      ) : (
        <li>
          <NavLink to="/users/signin" className={({ isActive }) => (isActive ? 'text-slate-800' : '')}>
            Login
          </NavLink>
        </li>
      )}
    </ul>
    </div>
  );
}



function UserDropdownDiv() {

  const {currentUser} = useAuth()
  const handleLogout = async () => {
    try {
      const response = await signOut(auth)
      
        console.log(' Successfully loggedout!');
      
    }
    catch{
      console.log(' Could not log out!');
    }
  }

  return (
    <ul className="flex flex-col items-center text-lg ">
      <li>
        <NavLink to="/users/dashboard" className="block px-4 mx-1 py-2  hover:scale-105">
          My Profile
        </NavLink>
      </li>
      <li>
        <button type='button' onClick={handleLogout} className="block px-4  mx-1 py-2 hover:scale-105">
          Logout
        </button>
      </li>
    </ul>
  );
}

export default Navbar;
