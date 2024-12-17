import React from 'react'

function Hero() {
  return (
    <div className=' p-4  '>
        {/* <h1 className='text-5xl playfair-display my-3' >
            Celestia
        </h1> */}
        
        <h2 className=' text-4xl playfair-display font-medium  italic my-3'>
         Sail into Serenity with <span className='text-6xl text font-semibold '>Celestia </span>...
        </h2>

        <img className=' w-1/2 mx-auto rounded-md ' src="src\assets\cruise2.png" alt="" />
        

        <h3 className='ml-10 text-3xl playfair-display  italic my-3  p-10 rounded-md'>
          <q> <span className='text-4xl text font-medium '> Celestia </span> is more than just a cruise. <br /> it’s a journey to an unforgettable voyage to soothe the soul and elevate your <span className='text-4xl text font-medium'>Senses. </span> </q>
        </h3>
  </div>
  )
}

export default Hero