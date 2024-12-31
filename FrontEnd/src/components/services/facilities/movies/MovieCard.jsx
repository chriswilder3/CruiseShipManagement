import React from 'react';

function MovieCard({ title, description, poster, duration }) {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md p-6 transition transform hover:scale-105 hover:shadow-lg">
      {/* Movie Poster */}
      <img
        className="rounded-lg mb-4 w-full h-60 object-cover"
        src={poster || '/src/assets/theatre.png'}
        alt={title}
      />

      {/* Movie Title */}
      <h2 className="text-xl font-semibold text-indigo-700 text-center">{title}</h2>

      {/* Movie Description */}
      <p className="text-sm text-gray-600 text-center mb-4">
        {description.length > 100 ? `${description.substring(0, 100)}...` : description}
      </p>

      {/* Movie Duration */}
      <p className="text-sm text-gray-500 text-center mb-4">Duration: {duration}</p>

      {/* Watch Now Button */}
      <button className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition text-sm">
        Watch Now
      </button>
    </div>
  );
}

export default MovieCard;
