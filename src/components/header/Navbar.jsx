import React, { useState } from 'react'
import NavbarDropDown from './NavbarDropDown'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
    const [serviceDropDown, setServiceDropDown] = useState( 'hidden')

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
                <a href="/services" className='hover:underline'> Services </a>
                <div className={`navbar-drop-down absolute z-10 transition-all delay-100 ease-in-out 
                        -left-full top-7 ${serviceDropDown}`}>
                    < NavbarDropDown  />
                </div>
                
            </li>
            <li>
                <NavLink to="/contact" className={({isActive})=>`${isActive?'text-slate-800':''}`}> Contact</NavLink>
            </li>
            <li className='ml-auto'>
                <a href=""> Login</a>
            </li>
        </ul>
    
  )
}

export default Navbar