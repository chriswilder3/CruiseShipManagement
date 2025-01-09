import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../../../contexts/UserContext';
import { useAuth } from '../../../../contexts/AuthContext';

function PartyhallCheckout() {
  const { userData, loading: userLoading } = useUser();
  const { currentUser, loading: authLoading } = useAuth();

  const location = useLocation(); // Access the passed state
  const navigate = useNavigate();

  // Extract the data passed from FitnessCard
  const bookingDetails = location.state;

  if (!bookingDetails) {
    // Redirect the user back if no data is found (optional safeguard)
    navigate('/services/facilities/partyhall');
    return null;
  }

  const confirmBooking = () => {

  }

  const { itemId, name, price, duration, imageUrl, date, timeSlot } = bookingDetails;
  
  if (authLoading || userLoading ) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900">
        <p className="text-lg font-semibold text-white">Loading...</p>
      </div>
    );
  }

  if( currentUser && currentUser.role !== "Guest" ){
  return(
    <div className="min-h-screen bg-gradient-to-b from-orange-200 via-orange-200 to-orange-100 flex flex-col items-center py-10">
        <h1 className="text-4xl font-bold text-indigo-600 mb-6 text-center capitalize">
          Partyhall Service Checkout
        </h1>

        <div className="bg-white shadow-md rounded-lg p-6 mb-3 w-11/12 max-w-4xl">
         
          <img src={imageUrl} alt={name} className="w-32 mx-auto rounded mb-4" />
          <p className="text-lg font-medium text-gray-700">
            <strong> Service:</strong> {name}
          </p>
          

          <p className="text-lg font-medium text-gray-700">
            <strong> Service ID:</strong> {itemId}
          </p>
          
          <p className="text-lg font-medium text-gray-700">
            <strong>Date:</strong> {date}
          </p>
          <p className="text-lg font-medium text-gray-700">
            <strong>Timings:</strong> {timeSlot}
          </p>
          <p className="text-lg font-medium text-gray-700">
            <strong>Duration:</strong> {duration} hours
          </p>
          <p className="text-lg font-medium text-gray-700">
            <strong>Price:</strong> {price}
          </p>
                
          
        </div>

        {/* <p className={`${showMsg ? "block" : "hidden"} mb-3 text-lg p-2 bg-green-600 text-white rounded-lg`}>
          {successMsg}
        </p> */}


        <button
          onClick={confirmBooking}
          className="mt-6 px-6 py-2 bg-green-500 text-white rounded hover:opacity-90 transition"
        >
          Confirm Booking
        </button>
      </div>
  )
  }

}

export default PartyhallCheckout;
