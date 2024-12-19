import React, { useState } from 'react'
import NavbarDropDown from './NavbarDropDown'

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
                <a href="/" className=' transition delay-75 hover:underline' > Home </a>
            </li>
            <li>
                <a href="/about"> About </a>
            </li>
            <li onMouseEnter={() => setServiceDropDown('inline')}
                onMouseLeave={() => setServiceDropDown('hidden')}
                className='relative' >
                <a href="" className='hover:underline'> Services </a>
                <div className={`navbar-drop-down absolute z-10 transition-all delay-100 ease-in-out 
                        -left-full top-7 ${serviceDropDown}`}>
                    < NavbarDropDown  />
                </div>
                
            </li>
            <li>
                <a href="/contact"> Contact</a>
            </li>
            <li className='ml-auto'>
                <a href=""> Login</a>
            </li>
        </ul>
    
  )
}

export default Navbar