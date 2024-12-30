import React, { useState } from 'react'
import NavbarDropDown from './NavbarDropDown'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function Navbar() {
    const [serviceDropDown, setServiceDropDown] = useState( 'hidden')
    const { currentUser, loading} = useAuth()

    // const navbardropdown = document.querySelector('.navbar-drop-down')
    // const hiddenToBlockChanger = () =>{
    //     navbardropdown.classList.remove('hidden');
        
    // }
    // const blockToHiddenChanger = () =>{
        
    //     navbardropdown.classList.add('hidden');
    // }
    // serviceDropDown ? hiddenToBlockChanger(): blockToHiddenChanger();
    
  return (
    
        <ul className=' flex gap-20 mb-10 justify-start px-16 pt-8 pb-2 text-blue-700 text-xl font-medium poppins'>
            <li>
                <NavLink to="/" className={({isActive})=>`${isActive?'text-slate-800':''}`} > Home </NavLink>
            </li>
            <li>
                <NavLink to="/about" className={({isActive})=>`${isActive?'text-slate-800':''}`}> About </NavLink>
            </li>
            <li onMouseEnter={() => setServiceDropDown('inline')}
                onMouseLeave={() => setServiceDropDown('hidden')}
                className='relative' >
                <NavLink to="/services" className={({isActive})=>`${isActive?'text-slate-800':''}`}> Services </NavLink>
                <div className={`navbar-drop-down absolute z-10 transition-all delay-100 ease-in-out 
                        -left-full top-7 ${serviceDropDown}`}>
                    < NavbarDropDown  />
                </div>
                
            </li>
            <li>
                <NavLink to="/contact" className={({isActive})=>`${isActive?'text-slate-800':''}`}> Contact</NavLink>
            </li>
            {
                currentUser? (<li className='ml-auto'>
                <NavLink to="/users/dashboard" className={({isActive})=>isActive?'text-slate-800':''}> {currentUser.email}</NavLink>
                </li>)
            :
            (<li className='ml-auto'>
                <NavLink to="/users/signin" className={({isActive})=>isActive?'text-slate-800':''}> Login </NavLink>
            </li>)
            }   
        </ul>
    
  )
}

export default Navbar