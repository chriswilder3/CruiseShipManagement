import React from 'react'

function NavbarDropDown(  ) {
  
    return (
    <div className='bg-slate-100 flex md:flex-row flex-col gap-3 p-4 roboto-slab rounded-md'>
        <div className=''>
            <h1 className='text-xl font-semibold my-1 text-slate-700'>
                Catering:
            </h1>    
            <div className='flex text-lg flex-col gap-1 text-left ml-5'>
                <p>  Snacks </p> 
                <p>  Beverages </p> 
                <p>  Desserts  </p> 
                <p>  Fine Dining </p> 
                <p>  Browse Full Menu </p> 
            </div>
        </div>

        <div className=''>
            <h1 className='text-xl font-semibold my-1'>
                Stationery:
            </h1> 
            <div className='flex text-lg flex-col gap-1 text-left ml-1'>
              <p>  Categories: </p>
              <p>  Gifts </p>
              <p>  Books </p>
              <p>  Personalized Stationery </p>
              <p> Explore Full Collection </p>
            </div>
            
        </div>
        <div className=''>
            <h1 className='text-xl font-semibold my-1'>
                Facilities:
            </h1>
            <div className='flex text-lg flex-col gap-1 text-left ml-1 *:min-w-44'>

              <p>  Resort-Movie Tickets </p>
              <p>  Beauty Salon </p>
              <p>  Fitness Center </p>
              <p>  Party Hall </p>
              <p className=''>  More Facilities </p>
            </div>
        </div>
    </div>
  )
}

export default NavbarDropDown