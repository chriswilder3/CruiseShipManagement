import React from 'react'

function NavbarDropDown(  ) {
  
    return (
    <div className='bg-slate-100 flex md:flex-row flex-col gap-2 p-5 roboto-slab rounded-md'>
        <div className=''>
            <h1 className='text-xl font-semibold my-1 text-left ml-2 text-slate-700'>
                Catering:
            </h1>    
            <div className='flex text-lg flex-col gap-1 text-left ml-6 *:min-w-40'>
                <p>  Snacks </p> 
                <p>  Beverages </p> 
                <p>  Desserts  </p> 
                <p>  Fine Dining </p> 
                <p>  Browse Menu </p> 
            </div>
        </div>

        <div className=''>
            <h1 className='text-xl font-semibold my-1 ml-2 text-slate-700'>
                Stationery:
            </h1> 
            <div className='flex text-lg flex-col gap-1 text-left ml-6 *:min-w-40'>
              <p>  Gifts </p>
              <p>  Daily Stationery </p>
              <p>  Books & Art works </p>
              <p>  Personal Stationery </p>
              <p> Full Collection </p>
            </div>
            
        </div>
        <div className=''>
            <h1 className='text-xl font-semibold my-1 ml-2 text-slate-700'>
                Facilities:
            </h1>
            <div className='flex text-lg flex-col gap-1 text-left ml-6 *:min-w-40'>

              <p>  Movie Tickets </p>
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