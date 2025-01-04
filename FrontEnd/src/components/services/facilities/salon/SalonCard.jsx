import React, { useState } from 'react'
import { useAuth } from '../../../../contexts/AuthContext'
import { db } from '../../../../firebase'
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";


function SalonCard({itemId, name, desc, price, duration, imageUrl}) {
  const {currentUser} = useAuth()
  const [message, setMessage] =  useState("")

  const handleAddCart = (e) => {
    if(!currentUser || currentUser.role === "Guest"){
      setMessage("You must be voyager to use services. Redirecting...");
      setTimeout(() => window.open("/users/dashboard", "_self"), 2000);
    }
    else{
        
        // First we will add it to the SalonOrders collection
        let colRef = collection(db,"SalonOrders")
        addDoc(colRef, {
          itemId,
          name,
          price,
          duration,
          imageUrl,
          uid : currentUser.uid
        })
        .then( () => {
          const successMessage = "Successfully booked the service";
          setMessage(successMessage);
        })
        .catch( (err) => {
          console.error("Error while updating Firestore:", err);
          setMessage("Failed to add item. Please try again.");
        })

        // Now lets also update the Users collection
        // specifically the SalonBookings  field.
        colRef = collection(db, "Users")
        const docRef = doc(colRef, currentUser.uid)
        getDoc(docRef)
        .then( (userData) => {
          const SalonBookingsArray = userData.data()['salonBookings']
          SalonBookingsArray.push( {
            itemId,
            name,
            price,
            duration,
            imageUrl,
          })

          updateDoc(docRef, {
            "salonBookings" : SalonBookingsArray
          })
          .then( () => {
            const successMessage = "Successfully added the booking to user profile. ";
            setMessage(successMessage);
          })
          .catch(  (err) => {
            console.error("Error while updating Firestore:", err);
            setMessage("Failed to add item to users profile. Please try again.");
          })

        })
        .catch((err) => {
          console.error("Error while updating Firestore:", err);
          setMessage("Failed to add item to Salonorders. Please try again.");
        })

    }
  }
    
  return (
    <div className='flex flex-col p-5 bg-slate-200 rounded-md '>
        
        <p className="text-blue-500 text-sm my-1">{message}</p>

        {/* Saloon service name */}
        <h1 className='p-1 text-gray-700'>
            {name}
        </h1>

        <img src={imageUrl} className='w-24 rounded self-center' alt="" />

        {/* Saloon service description */}
        <p className="text-sm text-gray-600 text-center mb-2">
            {desc.length > 100 ? `${description.substring(0, 100)}...` : desc}
        </p>

        {/* Saloon service duration */}
        <p className="text-sm text-gray-500 text-center mb-2">Duration: {duration}</p>

        {/* price */}
        <p className="text-lg font-medium mb-2 text-green-500">₹{price}</p>
        
        <button onClick={handleAddCart} id="order"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition text-sm">
            Book Now
        </button>

    </div>
  )
}

export default SalonCard