import React from 'react'


function Carousel() {
  return (
    <div className=' p-4   '>
        
        <div className='grid grid-cols-1 bg-gradient-to-b from-blue-500 to-sky-200 md:grid-cols-2 items-center justify-center mx-auto p-8 gap-4 rounded-md '>
            {/* Image Section */}
            <div className='flex justify-center'>
                <img 
                    className='w-3/4 md:w-2/3 rounded-md' 
                    src="src/assets/food2.png" 
                    alt="Gourmet Meal"
                />
            </div>
            
            {/* Text Section */}
            <div className='flex justify-center items-center text-center'>
                <h3 className='text-3xl italic playfair-display  font-medium '>
                    Indulge in gourmet meals prepared by world-class chefs, tailored to your tastes
                </h3>
            </div>
        </div>

    </div>
  )
}

export default Carousel