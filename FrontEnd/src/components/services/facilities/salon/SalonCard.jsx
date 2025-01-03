import React, { useState } from 'react'

function SalonCard({itemId, name, desc, price, duration, imageUrl}) {

  const handleAddCart = () => {
    
  }
    
  return (
    <div className='flex flex-col p-5 bg-slate-200 rounded-md '>
        <img src={imageUrl} className='w-24 rounded self-center' alt="" />
        
        {/* Saloon service name */}
        <h1 className='p-1 text-gray-700'>
            {name}
        </h1>

        {/* Saloon service description */}
        <p className="text-sm text-gray-600 text-center mb-2">
            {desc.length > 100 ? `${description.substring(0, 100)}...` : desc}
        </p>

        {/* Saloon service duration */}
        <p className="text-sm text-gray-500 text-center mb-2">Duration: {duration}</p>

        {/* price */}
        <p className="text-lg font-medium mb-2 text-green-500">₹{price}</p>
        
        <button onClick={handleAddCart} id="order"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition text-sm">
            Book Now
        </button>

    </div>
  )
}

export default SalonCard