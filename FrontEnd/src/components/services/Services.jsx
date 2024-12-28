import React from 'react'
import { Link } from 'react-router-dom'

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
                <Link to="/services/catering"> <img className='w-72 my-1 mb-3 hover:scale-105  rounded-md ' src="src\assets\food.png" alt="" /> </Link>
                <div className='flex text-lg flex-col gap-2 font-semibold text-white  *:min-w-40 *:bg-orange-300 *:rounded-tr-lg *:rounded-tl-lg *:p-1 *:shadow-md *shadow-gray-200  '>
                    <p className='hover:scale-105'> <Link to="/services/catering/snacks">  Snacks </Link> </p> 
                    <p className='hover:scale-105'> <Link to="/services/catering/beverages">Beverages </Link> </p> 
                    <p className='hover:scale-105'> <Link to="/services/catering/desserts">Desserts  </Link> </p> 
                    <p className='hover:scale-105'> <Link to="/services/catering/dining">Fine Dining </Link> </p> 
                    <p className='hover:scale-105'> <Link to="/services/catering">Browse Menu </Link> </p> 
                </div>
            </div>

            <div className='flex flex-col rounded-md p-4'>
                <h1 className='text-2xl font-semibold my-1 px-4 text-left ml-2 text-slate-700'>
                    Stationery:
                </h1>
                <Link to='/services/stationary' ><img className='w-72 my-1 rounded-md hover:scale-105 mb-3' src="src\assets\stationary.png" alt="" /> </Link>    
                <div className='flex text-lg flex-col gap-2 font-semibold text-slate-100  *:min-w-40 *:bg-blue-400 *:rounded-tr-lg *:rounded-tl-lg *:p-1 *:shadow-md *shadow-gray-200 '>
                    <p className='hover:scale-105'> <Link to='/services/stationary/gifts' > Gifts </Link> </p>
                    <p className='hover:scale-105'> <Link to='/services/stationary/stationary' > Daily Stationery </Link> </p>
                    <p className='hover:scale-105'> <Link to='/services/stationary/books_art' > Books & Art works </Link> </p>
                    <p className='hover:scale-105'> <Link to='/services/stationary/personal' > Personal Stationery </Link> </p>
                    <p className='hover:scale-105'> <Link to='/services/stationary' >Full Collection </Link> </p>
                </div>
            </div>

            
            <div className='flex flex-col rounded-md p-4'>
                <h1 className='text-2xl font-semibold my-1 px-4 text-left ml-2 text-slate-700'>
                    Facilities:
                </h1>
                <Link to='/services/facilities' > <img className='w-72 my-1 hover:scale-105 rounded-md mb-3 ' src="src\assets\partyhall.png" alt="" /> </Link>   
                <div className='flex text-lg flex-col gap-2 font-semibold text-slate-100  *:min-w-40 *:bg-sky-400 *:rounded-tr-lg *:rounded-tl-lg *:p-1 '>
                    <p className='hover:scale-105'> <Link to='/services/facilities/movie' > Movie Tickets </Link></p>
                    <p className='hover:scale-105'> <Link to='/services/facilities/salon' > Beauty Salon </Link></p>
                    <p className='hover:scale-105'> <Link to='/services/facilities/gym' > Fitness Center </Link></p>
                    <p className='hover:scale-105'> <Link to='/services/facilities/partyhall' > Party Hall </Link></p>
                    <p className='hover:scale-105'> <Link to='/services/facilities' > More Facilities </Link> </p>
                </div>
            </div>
            
        </div>
    </>
  )
}

export default Services