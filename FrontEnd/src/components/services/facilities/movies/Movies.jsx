import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import { db } from '../../../../firebase';
import { getDocs, collection } from 'firebase/firestore';

function Movies() {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect( () => {
        const fetchAllMovies = async () => {
            try{
                const colRef = collection(db,'Movies')
                const querySnap = await getDocs(colRef)
                if(querySnap){
                    const fetchedMovies = querySnap.docs.map( (doc)=>({
                        id : doc.id,
                        ...doc.data()
                    }))
                    setMovies(fetchedMovies)
                }
                
            }
            catch(err){
                console.log('Error fetching the movies : ', err);
            }   
        }
        fetchAllMovies()
        setLoading(false)
    },[])

    if (loading) {
        return <p className="text-center text-indigo-600">Loading...</p>;
    }
  return (
    <div className="p-6 bg-gradient-to-r from-gray-50 via-white to-gray-100 min-h-screen space-y-8">
      {/* Header */}
      <h1 className="text-5xl font-bold text-center text-indigo-700 poppins">
        Welcome to the <span className="text-indigo-500">Movie Theatre</span> of Celestia
      </h1>
      <p className="text-center text-lg text-gray-600">
        Experience the magic of cinema with our specially curated selection of movies.
      </p>

      {/* Search Bar */}
      <div className="flex justify-center">
        <form className="flex w-full max-w-md items-center">
          <input
            type="search"
            placeholder="Search for movies..."
            className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 text-gray-800 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-500 text-white rounded-r-md hover:bg-indigo-600 transition"
          >
            Search
          </button>
        </form>
      </div>

      {/* Movie Cards Grid */}
      <h2 className="text-2xl font-semibold text-indigo-700 text-center">Currently Showing</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            itemId={movie.id}
            name={movie.name}
            description={movie.description}
            imageUrl={movie.imageUrl}
            duration={movie.duration}
          />
        ))}
      </div>
    </div>
  );
}

export default Movies;