import React, { useState } from 'react'
import { useAuth } from '../../../../contexts/AuthContext'
import { collection, updateDoc, addDoc, getDoc, doc } from 'firebase/firestore'
import { db } from '../../../../firebase'

function FitnessCard({itemId, name, desc, price, duration, imageUrl, equipments}) {
  const {currentUser} = useAuth()
  const [message, setMessage] =  useState("")

  const handleAddCart = (e) => {
    
      if(!currentUser || currentUser.role === "Guest"){
        setMessage("You must be voyager to use services. Redirecting...");
        setTimeout(() => window.open("/users/dashboard", "_self"), 2000);
      }
      else{
          
          // First we will add it to the FitnessOrders collection
          let colRef = collection(db,"FitnessOrders")
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
          // specifically the fitnessBookings  field.
          colRef = collection(db, "Users")
          const docRef = doc(colRef, currentUser.uid)
          getDoc(docRef)
          .then( (userData) => {
            const fitnessBookingsArray = userData.data()['fitnessBookings']
            fitnessBookingsArray.push( {
              itemId,
              name,
              price,
              duration,
              imageUrl,
            })

            updateDoc(docRef, {
              "fitnessBookings" : fitnessBookingsArray
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
            setMessage("Failed to add item to fitnessorders. Please try again.");
          })

      }
  }
    
  return (
    <div className='flex flex-col p-5 bg-slate-200 rounded-md '>

        <p className="text-blue-500 text-sm my-1">{message}</p>

        {/* Image  */}
        <img src={imageUrl} className='w-32 rounded self-center' alt="" />
        
        {/* Fitness service name */}
        <h1 className='p-1 text-gray-700'>
            {name}
        </h1>

        {/* Fitness service description */}
        <p className="text-sm self-center text-gray-600 text-center mb-2 text-wrap w-3/4">
            {desc.length > 100 ? `${desc.substring(0, 100)}...` : desc}
        </p>

        {/* Fitness service duration */}
        <p className="text-sm text-gray-500 text-center mb-2">Duration: {duration} mins </p>

        {/* price */}
        <p className="text-lg font-medium mb-2 text-green-500">₹{price}</p>
        <p className='text-sm text-blue-500 text-center mb-2 '>
          <span className='text-slate-600'>Equipments : </span>  { equipments }
        </p>

        <button onClick={handleAddCart} id="order"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition text-sm">
            Book Now
        </button>

    </div>
  )
}

export default FitnessCard