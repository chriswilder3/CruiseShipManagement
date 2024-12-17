import React from 'react'

function Hero() {
  return (
    <div className=' p-4  '>
        <h1 className='text-5xl playfair-display my-3' >
            Celestia
        </h1>
        <img className=' w-1/2 mx-auto ' src="src\assets\cruise3.png" alt="" />
        
        <h2 className='ml-10 text-5xl playfair-display font-medium  italic my-3'>
         Sail into Serenity with Celestia...
        </h2>

        <h3 className='ml-10 text-3xl playfair-display  italic my-3'>
          <q> <span className='text-4xl font-'> Celestia </span> is more than just a cruise. <br /> it’s a journey into luxury, comfort, and serene elegance. <br /> Embark on an unforgettable voyage designed to soothe the soul and elevate your senses. </q>
        </h3>
  </div>
  )
}

export default Hero