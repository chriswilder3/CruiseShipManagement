import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import NavbarDropDown from './NavbarDropDown';

function Navbar() {
  const [serviceDropDown, setServiceDropDown] = useState('hidden');
  const [userDropdown, setUserDropdown] = useState(false);
  const { currentUser } = useAuth();

  const toggleUserDropdown = () => setUserDropdown((prev) => !prev);

  return (
    <ul className="sm:flex gap-20 mb-10 items-center px-16 pt-8 pb-2 text-blue-700 text-xl font-medium poppins">
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
                        -left-full top-7 ${serviceDropDown}`}
        >
          <NavbarDropDown />
        </div>
      </li>
      <li className="ml-auto">
        <NavLink to="/contact" className={({ isActive }) => `${isActive ? 'text-slate-800' : ''}`}>
          Contact
        </NavLink>
      </li>
      {currentUser ? (
        <li className="relative">
          <button
            type="button"
            onClick={toggleUserDropdown}
            className="text-slate-100 w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center"
          >
            {currentUser.email.slice(0, 2)}
          </button>
          {userDropdown && (
            <div
              className="absolute right-0 mt-2 w-40 bg-slate-100 shadow-lg rounded-lg py-2 z-50"
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
  );
}



function UserDropdownDiv() {
  return (
    <ul className="flex flex-col">
      <li>
        <NavLink to="/users/dashboard" className="block px-4 mx-1 py-2 hover:bg-gray-200">
          My Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="/users/logout" className="block px-4 mx-1 py-2 hover:bg-gray-200">
          Logout
        </NavLink>
      </li>
    </ul>
  );
}

export default Navbar;
