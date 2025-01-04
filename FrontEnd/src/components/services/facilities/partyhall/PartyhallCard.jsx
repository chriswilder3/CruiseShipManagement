import React, { useState } from 'react'
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from '../../../../contexts/AuthContext';
import { db } from '../../../../firebase';


function PartyhallCard({itemId, name, desc, price, duration, imageUrl, category}) {
  const {currentUser} = useAuth()
  const [message, setMessage] =  useState("") 

  const handleAddCart = (e) => {
    if(!currentUser || currentUser.role === "Guest"){
      setMessage("You must be voyager to use services. Redirecting...");
      setTimeout(() => window.open("/users/dashboard", "_self"), 2000);
    }
    else{
        
        // First we will add it to the PartyhallOrders collection
        let colRef = collection(db,"PartyhallOrders")
        addDoc(colRef, {
          itemId,
          name,
          price,
          duration,
          category,
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
        // specifically the PartyhallBookings  field.
        colRef = collection(db, "Users")
        const docRef = doc(colRef, currentUser.uid)
        getDoc(docRef)
        .then( (userData) => {
          const PartyhallBookingsArray = userData.data()['partyhallBookings']
          PartyhallBookingsArray.push( {
            itemId,
            name,
            price,
            category,
            duration,
            imageUrl,
          })

          updateDoc(docRef, {
            "partyhallBookings" : PartyhallBookingsArray
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
          setMessage("Failed to add item to Partyhallorders. Please try again.");
        })

    }
  }
    
  return (
    <div className='flex flex-col p-5 bg-slate-200 rounded-md '>

        <p className="text-blue-500 text-sm my-1">{message}</p>

        {/* Image  */}
        <img src={imageUrl} className='w-32 rounded self-center' alt="" />
        
        {/* Partyhall service category */}
        <p className='text-sm text-blue-500 text-center mb-2 '>
          <span className='text-slate-600'> type : </span>  { category }
        </p>


        {/* Partyhall service name */}
        <h1 className='p-1  text-gray-700'>
            {name}
        </h1>

        {/* Partyhall service description */}
        <p className="text-sm self-center text-gray-600 text-center mb-2 text-wrap w-3/4">
            {desc.length > 100 ? `${desc.substring(0, 100)}...` : desc}
        </p>

        {/* Partyhall service duration */}
        <p className="text-sm text-gray-500 text-center mb-2">Duration: {duration} hrs </p>

        {/* price */}
        <p className="text-lg font-medium mb-2 text-green-500">₹{price}</p>
        
        <button onClick={handleAddCart} id="order"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition text-sm">
            Book Now
        </button>

    </div>
  )
}

export default PartyhallCard