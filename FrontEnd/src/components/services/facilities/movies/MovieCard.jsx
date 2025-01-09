import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { doc, getDoc, collection } from "firebase/firestore";
import { db } from "../../../../firebase";

function MovieCard({ itemId, name, description, imageUrl, duration, price, screenNumber }) {
  const { currentUser } = useAuth();
  const [message, setMessage] = useState("");
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  // Handle Add to Favorites
  const handleAddToFavorites = () => {
    if (!currentUser) {
      setMessage("You are not logged in. Redirecting...");
      setTimeout(() => window.open("/users/signin", "_self"), 2000);
      return;
    }

    const docRef = doc(db, "Users", currentUser.uid);

    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          const existingFavorites = userData.favouriteMovies || [];

          const newFavorite = { itemId, name, duration };
          const isAlreadyFavorited = existingFavorites.some((movie) => movie.itemId === itemId);

          if (isAlreadyFavorited) {
            setMessage("Movie already in favorites.");
          } else {
            const updatedFavorites = [...existingFavorites, newFavorite];
            updateDoc(docRef, { favouriteMovies: updatedFavorites })
              .then(() => setMessage("Added to Favorites!"))
              .catch((err) => console.error(err));
          }
        } else {
          setMessage("User document not found.");
        }
      })
      .catch((err) => {
        console.error("Error while fetching user document:", err);
        setMessage("Failed to add to favorites. Please try again.");
      });
  };

  // Handle Booking Popup
  const handleBookingPopUp = () => {
    if (!currentUser) {
      setMessage("You are not logged in. Redirecting...");
      setTimeout(() => window.open("/users/signin", "_self"), 2000);
      return;
    }
    setShowBookingPopup(true);
  };

  const closeBookingPopUp = () => {
    setShowBookingPopup(false);
  };

  // Handle Confirm Booking
  const handleConfirmBooking = () => {
    if (!selectedSeats.length || !selectedDate || !selectedSlot) {
      setMessage("Please select seats, a date, and a time slot to proceed.");
      return;
    }

    const bookingData = {
      category: "Movies",
      movieId: itemId,
      name,
      screenNumber,
      selectedSeats,
      selectedDate,
      selectedSlot,
    };
    console.log(bookingData);

    // Redirect to FacilityCheckout with booking data
    const queryParams = new URLSearchParams(bookingData).toString();
    window.open(`/services/facilities/movies/movieCheckout?${queryParams}`, "_self");
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md p-6 transition transform hover:scale-105 hover:shadow-lg">
      <p className="text-blue-500 text-sm my-1">{message}</p>

      <h2 className="text-blue-500 text-2xl font-medium poppins my-1">Screen-{screenNumber}</h2>
      <img
        className="rounded-lg mb-4 w-full h-60 object-cover"
        src={imageUrl || "/src/assets/theatre.png"}
        alt={name}
      />
      <h2 className="text-xl font-semibold text-indigo-700 text-center">{name}</h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        {description.length > 100 ? `${description.substring(0, 100)}...` : description}
      </p>
      <p className="text-sm text-gray-500 text-center mb-4">Duration: {duration}</p>
      <p className="text-lg font-medium text-green-500">₹{price}</p>

      {/* Add to Favorites Button */}
      <button
        onClick={handleAddToFavorites}
        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition text-sm mb-2"
      >
        Add to Favorites
      </button>

      {/* Book Now Button */}
      <button
        onClick={handleBookingPopUp}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition text-sm"
      >
        Book Now
      </button>

      {showBookingPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col gap-2  justify-center items-center z-50">
          <button type="button" onClick={closeBookingPopUp} className="ml-auto mr-3 bg-white rounded-md text-red-500 p-1">
            <i className="fa fa-window-close" aria-hidden="true"></i>
          </button>
          <TicketBookingPopUp
            screenNumber={screenNumber}
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
            onConfirmBooking={handleConfirmBooking}
          />
        </div>
      )}
    </div>
  );
}

export default MovieCard;

// TicketBookingPopUp Component
function TicketBookingPopUp({
  screenNumber,
  selectedSeats,
  setSelectedSeats,
  selectedDate,
  setSelectedDate,
  selectedSlot,
  setSelectedSlot,
  onConfirmBooking,
}) {
  const [seatingsLoading, setSeatingsLoading] = useState(true);
  const [seatingsArray, setSeatingsArray] = useState([]);

  const today = new Date();
  const upcomingDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return date.toISOString().split("T")[0];
  });

  const availableSlots = ["12:00PM", "3:00PM", "6:00PM", "9:00PM"];

  // Fetch seating data when the date or slot changes
  useEffect(() => {
    if (selectedDate && selectedSlot) {
      const seatingDocId = `${selectedDate}_${selectedSlot}`; // Combine date and slot as docId
      const docRef = doc(db, "movieSeatings", seatingDocId); // Fetching seating data for the specific date and slot
      getDoc(docRef)
        .then((seatingDoc) => {
          if (seatingDoc.exists()) {
            const seatingData = seatingDoc.data();
            const screenData = seatingData[`screen${screenNumber}`]; // Fetch seating data for selected screen (e.g., screen1, screen2, etc.)
            setSeatingsArray(screenData || []); // Set seating array based on screen number
          } else {
            setSeatingsArray([]); // If no seating data exists, set as empty
          }
        })
        .catch((err) => console.error("Error fetching seating data:", err))
        .finally(() => setSeatingsLoading(false));
    }
  }, [selectedDate, selectedSlot, screenNumber]);

  const toggleSeatSelection = (seatNumber) => {
    if (seatingsArray[seatNumber].occupied) return;
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-xl text-indigo-600 mb-4 roboto text-center">Book Seats</h2>

      <hr />
      <p> Movie Screen </p>
      <hr />
      <br />

      {/* Seat Grid */}
      {seatingsLoading ? (
        <p className="text-center text-indigo-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-8 gap-2 mb-4">
          {seatingsArray.map((seat, index) => (
            <div
              key={index}
              className={`p-2 w-8 h-8 border-2 border-slate-700 rounded ${seat.occupied ? "bg-red-500" : selectedSeats.includes(index) ? "bg-yellow-500" : "bg-green-500"} cursor-pointer`}
              onClick={() => toggleSeatSelection(index)}
              title={seat.occupied ? "Occupied" : "Available"}
            >
              {seat.number}
            </div>
          ))}
        </div>
      )}

      {/* Date Selection */}
      <label className="block text-sm font-medium text-gray-700 mb-2">Select Date:</label>
      <select
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="" disabled>
          Select a date
        </option>
        {upcomingDates.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>

      {/* Slot Selection */}
      <label className="block text-sm font-medium text-gray-700 mb-2">Select Slot:</label>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {availableSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => setSelectedSlot(slot)}
            className={`px-4 py-2 rounded ${selectedSlot === slot ? "bg-indigo-500 text-white" : "bg-gray-200"} hover:bg-indigo-400 transition`}
          >
            {slot}
          </button>
        ))}
      </div>

      <button
        onClick={onConfirmBooking}
        className="w-full px-4 py-2 bg-indigo-500 text-white rounded hover:opacity-90"
      >
        Confirm Booking
      </button>
    </div>
  );
}
