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
      {/* <p className="text-center text-lg text-indigo-600">
        Experience the magic of cinema with our specially curated selection of movies.
      </p> */}

      {/* Show times */}
      
      <h1 className='text-3xl text-gray-600 roboto font-medium'>
          Show Times :
      </h1>
      <div className='flex flex-row gap-3 text-green-500 font-bold justify-center text-2xl roboto'>
            <div>
              12:00 PM
            </div>
            <div>
              3:00 PM
            </div>
            <div>
              6:00 PM
            </div>
            <div>
              9:00 PM
            </div>
      </div>
      


      {/* Movie Cards Grid */}
      <h2 className="text-2xl font-semibold text-indigo-700 text-center">Currently Showing</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {movies.map((movie,index) => (
          <MovieCard
            key={movie.id}
            screenNumber={movie.screenNumber}
            itemId={movie.id}
            name={movie.name}
            description={movie.description}
            imageUrl={movie.imageUrl}
            duration={movie.duration}
            price={movie.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Movies;