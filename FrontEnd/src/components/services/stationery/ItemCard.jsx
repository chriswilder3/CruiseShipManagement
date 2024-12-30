import React from 'react'

function ItemCard({name, desc, price}) {
    console.log(name, desc, price);
  return (
    <div className="flex flex-col justify-between items-center bg-white rounded-lg shadow-lg p-4 space-y-4 transform transition hover:scale-105 hover:shadow-lg">
        {/* Item Name */}
        <h1 className="text-lg font-semibold roboto text-gray-800 text-center">
            {name}
        </h1>

        {/* Item Image */}
        <img 
            className="w-36 h-36 object-cover rounded-lg" 
            src="/src/assets/stationary.png" 
            alt="Food item image" 
        />

        {/* Item Description */}
        <p className="text-sm text-gray-600 text-center">
            {desc}
        </p>

        {/* Price */}
        <p className="text-lg font-medium text-green-500">
            ₹{price}
        </p>

        {/* Add to Cart Button */}
        <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-sm"
        >
            Add to Cart
        </button>
    </div>

  )
}

export default ItemCard