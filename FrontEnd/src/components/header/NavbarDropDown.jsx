import React from 'react'
import { Link } from 'react-router-dom';

function NavbarDropDown(  ) {
  
    return (
    <div className='bg-slate-100 flex flex-col gap-2 p-5 roboto rounded-md'>
        <div className='bg-sky-500 rounded-md transition-transform duration-100 hover:scale-105'>
            <Link to="/services/catering">
                <h1 className='text-xl  my-1 text-slate-100'>
                    Catering
                </h1>  
            </Link>  
        </div>

        <div className='bg-sky-500 rounded-md transition-transform duration-100 hover:scale-105'>
            <Link to="/services/stationery">
                <h1 className='text-xl  my-1 text-slate-100'>
                    
                    Stationery
                </h1>
            </Link>
            
        </div>
        <div className='rounded-md p-1'>
            <Link to="/services/facilities">
                <h1 className='text-xl text-white bg-indigo-500 my-1 p-1 rounded-md transition-transform duration-100 hover:scale-105'>
                    <span> &#8643; </span>    Facilities
                </h1>
            </Link>

            <div className='flex text-lg flex-col gap-2 text-slate-100 *:bg-blue-500 *:p-1 *:rounded-md  *:min-w-40'>

              <Link to='/services/facilities/movies'><p className='transition-transform duration-100 hover:scale-105 '>  Movie Tickets </p></Link>
              <Link to='/services/facilities/salon'><p className='transition-transform duration-100 hover:scale-105 '>  Beauty Salon </p></Link>
              <Link to='/services/facilities/fitness'><p className='transition-transform duration-100 hover:scale-105 '>  Fitness Center </p></Link>
              <Link to='/services/facilities/partyhall'><p className='transition-transform duration-100 hover:scale-105 '>  Party Hall </p></Link>
            </div>
        </div>
    </div>
  )
}

export default NavbarDropDown;