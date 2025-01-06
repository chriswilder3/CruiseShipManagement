import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import NavbarDropDown from './NavbarDropDown';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useUser } from '../../contexts/UserContext';


function Navbar() {
  const [ serviceDropDown, setServiceDropDown ] = useState('hidden');
  const [ userDropdown, setUserDropdown ] = useState(false);
  const [ mobileMenuOpen, SetMobileMenuOpen ] = useState(false);
  const { currentUser,loading:authLoading } = useAuth();
  const { userData, loading:userLoading } = useUser();
  const [ cartContents, setCartContents ] = useState([])
  const [ cartCount, setCartCount] = useState(0)
  const [ showCartPopup, setShowCartPopUp] = useState(false)
  const [ cartSubTotal, setCartSubTotal] = useState(null)

  useEffect(()=>{
    if(userData){
      setCartContents(userData.cart)
      
      // if(cartContents === []){
      //   setCartCount(0)
      // }
      // else{
      //   setCartCount(cartContents.length)
      // }
    }
  },[userData])

  useEffect(()=>{
    if(cartContents){
      console.log("cart",cartContents);
      if(cartContents === []){
        setCartCount(0)
      }
      else{
        setCartCount(cartContents.length)
        let total = 0
        cartContents.forEach( (item) => {
          total = total + item.price
        })
        setCartSubTotal(total)

      }
    }
  },[cartContents])
  
  

  const toggleUserDropdown = () => setUserDropdown((prev) => !prev);
  const handleMobileMenuOpen = () => SetMobileMenuOpen((prev) => !prev)
  const handleMobileMenuClose = () => {
    setTimeout( () =>{
      SetMobileMenuOpen(false)
    },1000)
  }

  const togglePopUp = () => {
    
    if(!currentUser){
      window.open("/users/signin/","_self")
    }

    setShowCartPopUp((prev) => !prev)

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
      <li className="ml-auto relative">
        <button onClick={togglePopUp}  className='text-3xl sm:text-3xl text-slate-800'>
          <i className="text-slate-800 fa badge fa-lg"  > &#xf07a;</i>
         <p className='z-10 w-8 h-8 text-sm sm:text-base rounded-full flex items-center justify-center bg-red-500 text-white absolute left-48 -top-2 sm:left-3 sm:-top-4'> <span className='my-auto self-center'> {cartCount}</span> </p>
        </button>

        <div className={`z-10 absolute ${showCartPopup?"hidden":"flex flex-col gap-2 "} p-3 min-w-96 cartshow sm:-left-44 bg-blue-100 rounded-md shadow-lg `}> 
          
            <div onClick={togglePopUp} className=' p-0.5 px-2 w-fit  text-md text-red-400 ml-auto rounded-md transition-transform duration-100 hover:scale-105 hover:cursor-pointer'>
              <i class="fa fa-window-close"></i>
            </div>
            <div className='flex flex-col gap-1 overflow-y-auto max-h-96'>
            {
              cartContents && cartContents.map( (item) =>{
              return <div className='p-1  bg-white text-base rounded-md shadow-sm'>
                  <p>
                    { item.name}
                  </p>
                  <p className="text-lg font-bold roboto  text-green-600">₹{item.price}</p>
                </div>
              })
            }
          </div>
          <div className='flex flex-row roboto  p-1 '>
              <h2 className='ml-auto p-1  text-slate-700 '>
                Cart subtotal : ₹{cartSubTotal}
              </h2>
              <button className='ml-auto p-1  text-lg bg-blue-600 text-gray-100 rounded-md transition-transform duration-100 hover:scale-105'>
                Checkout
              </button>
          </div>
          
        </div>
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
