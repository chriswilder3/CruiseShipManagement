import React, { useState } from 'react'

function PartyhallCard({itemId, name, desc, price, duration, imageUrl, category}) {

  const handleAddCart = () => {

  }
    
  return (
    <div className='flex flex-col p-5 bg-slate-200 rounded-md '>
        <img src={imageUrl} className='w-32 rounded self-center' alt="" />
        
        
        {/* Partyhall service category */}
        <p className='text-sm text-blue-500 text-center mb-2 '>
          <span className='text-slate-600'> type : </span>  { category }
        </p>


        {/* Partyhall service name */}
        <h1 className='p-1  text-gray-700'>
            {name}
        </h1>

        {/* Partyhall service description */}
        <p className="text-sm self-center text-gray-600 text-center mb-2 text-wrap w-3/4">
            {desc.length > 100 ? `${desc.substring(0, 100)}...` : desc}
        </p>

        {/* Partyhall service duration */}
        <p className="text-sm text-gray-500 text-center mb-2">Duration: {duration} hrs </p>

        {/* price */}
        <p className="text-lg font-medium mb-2 text-green-500">₹{price}</p>
        
        <button onClick={handleAddCart} id="order"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition text-sm">
            Book Now
        </button>

    </div>
  )
}

export default PartyhallCard