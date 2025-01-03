import React, { useState } from 'react'

function FitnessCard({itemId, name, desc, price, duration, imageUrl, equipments}) {

  const handleAddCart = () => {

  }
    
  return (
    <div className='flex flex-col p-5 bg-slate-200 rounded-md '>
        <img src={imageUrl} className='w-28 rounded self-center' alt="" />
        
        {/* Fitness service name */}
        <h1 className='p-1 text-gray-700'>
            {name}
        </h1>

        {/* Fitness service description */}
        <p className="text-sm self-center text-gray-600 text-center mb-2 text-wrap w-3/4">
            {desc.length > 100 ? `${description.substring(0, 100)}...` : desc}
        </p>

        {/* Fitness service duration */}
        <p className="text-sm text-gray-500 text-center mb-2">Duration: {duration} mins </p>

        {/* price */}
        <p className="text-lg font-medium mb-2 text-green-500">₹{price}</p>
        <p className='text-sm text-blue-500 text-center mb-2 '>
          <span className='text-slate-600'>Equipments : </span>  { equipments }
        </p>

        <button onClick={handleAddCart} id="order"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition text-sm">
            Book Now
        </button>

    </div>
  )
}

export default FitnessCard