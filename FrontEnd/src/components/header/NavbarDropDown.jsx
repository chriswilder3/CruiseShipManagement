import React from 'react'

function NavbarDropDown(  ) {
  
    return (
    <div className='bg-slate-100 flex flex-col gap-2 p-5 roboto rounded-md'>
        <div className='bg-sky-500 rounded-md transition-transform duration-100 hover:scale-105'>
            <h1 className='text-xl  my-1 text-slate-100'>
                Catering
            </h1>    
        </div>

        <div className='bg-indigo-500 rounded-md transition-transform duration-100 hover:scale-105'>
            <h1 className='text-xl  my-1 text-slate-100'>
                Stationery
            </h1> 
            
        </div>
        <div className='rounded-md p-1'>
            <h1 className='text-xl  my-1 '>
                Facilities
            </h1>
            <div className='flex text-lg flex-col gap-2 text-slate-100 *:bg-blue-500 *:p-1 *:rounded-md  *:min-w-40'>

              <p className='transition-transform duration-100 hover:scale-105 '>  Movie Tickets </p>
              <p className='transition-transform duration-100 hover:scale-105 '>  Beauty Salon </p>
              <p className='transition-transform duration-100 hover:scale-105 '>  Fitness Center </p>
              <p className='transition-transform duration-100 hover:scale-105 '>  Party Hall </p>
            </div>
        </div>
    </div>
  )
}

export default NavbarDropDown;