import React from 'react'

function Catering() {
  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-lg shadow-lg space-y-8">
        <h1 className="text-4xl font-bold text-center poppins text-gray-800">
            Welcome to <span className="text-blue-500">Celestia</span> Catering and Dining
        </h1>

        {/* Search Bar */}
        <div className="flex flex-col items-center space-y-4">
            <p className="text-lg text-gray-600">
                Explore a world of delicious offerings tailored for your voyage.
            </p>
            <form className="flex w-full max-w-md items-center">
                <input 
                    type="search" 
                    placeholder="Search items..." 
                    className="flex-grow px-4 py-2 text-gray-800 rounded-l-md border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                />
                <button 
                    type="submit" 
                    className="px-6 py-2 text-white bg-blue-500 rounded-r-md hover:bg-blue-600 transition"
                >
                    Search
                </button>
            </form>
        </div>

        {/* Food Items Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            
            {/* Add more FoodCard components as needed */}
        </div>
    </div>

  )
}

export default Catering