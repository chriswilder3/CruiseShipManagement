import React from 'react'

function Services() {
  return (
    <>
        <h1 className='text-5xl font-semibold poppins text-blue-600'>
            Services Available:
        </h1>
        
        <div className=' my-4 flex md:flex-row md:gap-36 flex-wrap justify-center poppins'>
            <div className='flex flex-col rounded-md p-4'>
                <h1 className='text-2xl font-semibold my-1 px-4 text-left ml-2 text-slate-700'>
                    Catering:
                </h1>    
                <img className='w-72 my-1 mb-3  rounded-md ' src="src\assets\food.png" alt="" />
                <div className='flex text-lg flex-col gap-2 font-semibold text-white  *:min-w-40 *:bg-orange-300 *:rounded-tr-lg *:rounded-tl-lg *:p-1 *:shadow-md *shadow-gray-200  '>
                    <p className='hover:scale-105'>  Snacks </p> 
                    <p className='hover:scale-105'>  Beverages </p> 
                    <p className='hover:scale-105'>  Desserts  </p> 
                    <p className='hover:scale-105'>  Fine Dining </p> 
                    <p className='hover:scale-105'>  Browse Menu </p> 
                </div>
            </div>

            <div className='flex flex-col rounded-md p-4'>
                <h1 className='text-2xl font-semibold my-1 px-4 text-left ml-2 text-slate-700'>
                    Stationery:
                </h1>
                <img className='w-72 my-1 rounded-md mb-3' src="src\assets\stationary.png" alt="" />    
                <div className='flex text-lg flex-col gap-2 font-semibold text-slate-100  *:min-w-40 *:bg-blue-400 *:rounded-tr-lg *:rounded-tl-lg *:p-1 *:shadow-md *shadow-gray-200 '>
                    <p className='hover:scale-105'>  Gifts </p>
                    <p className='hover:scale-105'>  Daily Stationery </p>
                    <p className='hover:scale-105'>  Books & Art works </p>
                    <p className='hover:scale-105'>  Personal Stationery </p>
                    <p className='hover:scale-105'> Full Collection </p>
                </div>
            </div>

            
            <div className='flex flex-col rounded-md p-4'>
                <h1 className='text-2xl font-semibold my-1 px-4 text-left ml-2 text-slate-700'>
                    Facilities:
                </h1>
                <img className='w-72 my-1 rounded-md mb-3 ' src="src\assets\partyhall.png" alt="" />    
                <div className='flex text-lg flex-col gap-2 font-semibold text-slate-100  *:min-w-40 *:bg-sky-400 *:rounded-tr-lg *:rounded-tl-lg *:p-1 '>
                    <p className='hover:scale-105'>  Movie Tickets </p>
                    <p className='hover:scale-105'>  Beauty Salon </p>
                    <p className='hover:scale-105'>  Fitness Center </p>
                    <p className='hover:scale-105'>  Party Hall </p>
                    <p className='hover:scale-105'>  More Facilities </p>
                </div>
            </div>
            
        </div>
    </>
  )
}

export default Services