import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { db } from '../../../../firebase';
import { getDocs, collection, setDoc, doc, getDoc } from 'firebase/firestore';

const DAYS_AHEAD = 7; // Generate data for the next 7 days
const TIME_SLOTS = ["12:00PM", "3:00PM", "6:00PM", "9:00PM"]; // Time slots per day
const SCREEN_COUNT = 4; // Number of screens (e.g., screen1, screen2, screen3, screen4)
const SEATS_PER_SCREEN = [40, 40, 40, 40]; // Number of seats per screen

// Helper function to generate an empty seating array
function generateEmptySeatingArray(seatCount) {
  return Array(seatCount).fill(""); // Empty strings represent available seats
}

// Main function to generate `movieSeatings` data
async function generateMovieSeatings() {
  try {
    for (let i = 0; i < DAYS_AHEAD; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const formattedDate = date.toISOString().split("T")[0]; // Format: YYYY-MM-DD

      for (const slot of TIME_SLOTS) {
        const docId = `${formattedDate}_${slot}`; // Example: 2025-01-08_12:00PM
        const screensData = {};

        for (let screenIndex = 0; screenIndex < SCREEN_COUNT; screenIndex++) {
          const screenName = `screen${screenIndex + 1}`;
          screensData[screenName] = generateEmptySeatingArray(SEATS_PER_SCREEN[screenIndex]);
        }

        // Add document to Firestore
        await setDoc(doc(collection(db, "movieSeatings"), docId), screensData);

        console.log(`Document created: ${docId}`);
      }
    }

    console.log("Data generation completed successfully.");
  } catch (error) {
    console.error("Error generating data:", error);
  }
}

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        // Check if 'movieSeatings' collection exists
        const colRef = collection(db, 'movieSeatings');
        const querySnap = await getDocs(colRef);

        // If no documents are found, generate the seating data
        if (querySnap.empty) {
          console.log("movieSeatings collection doesn't exist. Generating data...");
          await generateMovieSeatings(); // Generate the seating data
        }

        // Fetch all movies
        const movieColRef = collection(db, 'Movies');
        const movieQuerySnap = await getDocs(movieColRef);
        if (movieQuerySnap) {
          const fetchedMovies = movieQuerySnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMovies(fetchedMovies);
        }
      } catch (err) {
        console.log('Error fetching the movies: ', err);
      }
    };

    fetchAllMovies();
    setLoading(false);
  }, []);

  if (loading) {
    return <p className="text-center text-indigo-600">Loading...</p>;
  }

  return (
    <div className="p-6 bg-gradient-to-r from-gray-50 via-white to-gray-100 min-h-screen space-y-8">
      {/* Header */}
      <h1 className="text-5xl font-bold text-center text-indigo-700 poppins">
        Welcome to the <span className="text-indigo-500">Movie Theatre</span> of Celestia
      </h1>

      {/* Show times */}
      <h1 className='text-3xl text-gray-600 roboto font-medium'>
        Show Times :
      </h1>
      <div className='flex flex-row gap-3 text-green-500 font-bold justify-center text-2xl roboto'>
        <div>12:00 PM</div>
        <div>3:00 PM</div>
        <div>6:00 PM</div>
        <div>9:00 PM</div>
      </div>

      {/* Movie Cards Grid */}
      <h2 className="text-2xl font-semibold text-indigo-700 text-center">Currently Showing</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {movies.map((movie) => (
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
