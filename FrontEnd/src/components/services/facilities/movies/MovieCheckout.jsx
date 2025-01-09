import React, { useEffect, useState } from "react";
import { useUser } from "../../../../contexts/UserContext";
import { useAuth } from "../../../../contexts/AuthContext";
import { collection, doc, getDoc , setDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { db } from "../../../../firebase";

function MovieCheckout() {
  const { userData, loading: userLoading } = useUser();
  const { currentUser, loading: authLoading } = useAuth();

  const location = useLocation();

  // Query parameters
  const searchParams = new URLSearchParams(location.search);
  const movieId = searchParams.get("movieId");
  const name = searchParams.get("name");
  const screenNumber = searchParams.get("screenNumber");
  const selectedSeats = searchParams.get("selectedSeats")?.split(","); 
  const selectedDate = searchParams.get("selectedDate");
  const selectedSlot = searchParams.get("selectedSlot");

  const [successMsg, setSuccessMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null);

  const confirmBooking = async () => {
    try {

      // I am confirming the movie Seatings here.

      const movieDocRef = doc(collection(db, "movieSeatings"), movieId);
      const movieDoc = await getDoc(movieDocRef);
      const movieData = movieDoc.data();

      if (!movieData) {
        console.log("Movie seating data not found");
        return;
      }

      // Check for already booked seats
      const { occupiedSeats } = movieData || {};
      const newOccupiedSeats = new Set(occupiedSeats || []);

      for (const seat of selectedSeats) {
        if (newOccupiedSeats.has(seat)) {
          setBookingStatus("One or more seats are already booked. Please select different seats.");
          return;
        }
        newOccupiedSeats.add(seat); // Mark seat as occupied
      }

      // Update Firestore with newly occupied seats
      await updateDoc(movieDocRef, { occupiedSeats: Array.from(newOccupiedSeats) });

      setSuccessMsg("Booking confirmed successfully!");
      setShowMsg(true);

      setTimeout(() => {
        setShowMsg(false);
        setBookingStatus(null);
      }, 3000);
    } catch (error) {
      console.error("Error confirming booking:", error);
      setBookingStatus("Failed to confirm booking. Please try again.");
    }
  };

  useEffect(() => {
    console.log("Booking Data:", {
      movieId,
      name,
      screenNumber,
      selectedSeats,
      selectedDate,
      selectedSlot,
    });
  }, [movieId, name, screenNumber, selectedSeats, selectedDate, selectedSlot]);

  if (authLoading || userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900">
        <p className="text-lg font-semibold text-white">Loading...</p>
      </div>
    );
  }

  if (currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-200 via-orange-200 to-orange-100 flex flex-col items-center py-10">
        <h1 className="text-4xl font-bold text-indigo-600 mb-6 text-center capitalize">
          Facility Checkout
        </h1>

        <div className="bg-white shadow-md rounded-lg p-6 mb-3 w-11/12 max-w-4xl">
          <p className="text-lg font-medium text-gray-700">
            <strong>Movie Name:</strong> {name}
          </p>
          <p className="text-lg font-medium text-gray-700">
            <strong>Movie ID:</strong> {movieId}
          </p>
          <p className="text-lg font-medium text-gray-700">
            <strong>Screen Number:</strong> {screenNumber}
          </p>
          <p className="text-lg font-medium text-gray-700">
            <strong>Seats:</strong> {selectedSeats?.join(", ")}
          </p>
          <p className="text-lg font-medium text-gray-700">
            <strong>Date:</strong> {selectedDate}
          </p>
          <p className="text-lg font-medium text-gray-700">
            <strong>Slot:</strong> {selectedSlot}
          </p>
        </div>

        <p className={`${showMsg ? "block" : "hidden"} mb-3 text-lg p-2 bg-green-600 text-white rounded-lg`}>
          {successMsg}
        </p>

        {bookingStatus && (
          <p className="text-lg text-red-500 mb-3">{bookingStatus}</p>
        )}

        <button
          onClick={confirmBooking}
          className="mt-6 px-6 py-2 bg-green-500 text-white rounded hover:opacity-90 transition"
        >
          Confirm Booking
        </button>
      </div>
    );
  }

  return null;
}

export default MovieCheckout;
