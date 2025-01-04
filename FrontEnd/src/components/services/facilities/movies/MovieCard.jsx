import React, { useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { doc,getDoc, updateDoc, addDoc,collection } from 'firebase/firestore';
import { db } from '../../../../firebase'

function MovieCard({ itemId, name, description, imageUrl, duration, price }) {
  const [message, setMessage] = useState("");
  const { currentUser } = useAuth();

  const handleAddCart = (e) => {
    const cartOrOrder = e.target.getAttribute("id");

    if (!currentUser) {
      setMessage("You are not logged in. Redirecting...");
      setTimeout(() => window.open("/users/signin", "_self"), 2000);
    }
    else if(currentUser.role === 'Guest'){
      setMessage("You must be voyager to use services. Redirecting...");
      setTimeout(() => window.open("/users/dashboard", "_self"), 2000);
    }
    else{

      let colRef = collection(db, "Users");
      const docRef = doc(colRef, currentUser.uid);

      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            const cartOrOrderArray = cartOrOrder === "cart" ? "movieCart" : "movieBookings";
            const currentArray = userData[cartOrOrderArray] || [];

            // Prepare the new item data
            const newItem = { itemId, name , imageUrl, price, duration };

            // Add the new item to the array
            currentArray.push(newItem);

            // Update the user's cart or orders in Firestore
            updateDoc(docRef, {
              [cartOrOrderArray]: currentArray,
            })
              .then(() => {
                const successMessage =
                  cartOrOrder === "cart"
                    ? "Successfully added to cart."
                    : "Successfully added to orders.";
                setMessage(successMessage);
                if(cartOrOrder !== "cart"){
                      colRef = collection(db, "movieBookings")
                      addDoc(colRef, { 
                          itemId, name, imageUrl, duration, price, uid : currentUser.uid
                      }
                            
                      )
                      .then( () => {
                          const successMessage =
                                cartOrOrder === "cart"
                                  ? "Successfully added to cart."
                                  : "Successfully added to orders.";
                              setMessage(successMessage);
                      })
                      .catch( (err) => {
                          console.error("Error while updating Firestore:", err);
                              setMessage("Failed to add item. Please try again.");
                      })
                }

              })
              .catch((err) => {
                console.error("Error while updating Firestore:", err);
                setMessage("Failed to add item. Please try again.");
              });
          } else {
            setMessage("User document not found.");
          }
        })
        .catch((err) => {
          console.error("Error while fetching user document:", err);
          setMessage("Failed to add item. Please try again.");
        });

    }

    
  };



  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md p-6 transition transform hover:scale-105 hover:shadow-lg">
      
      <p className="text-blue-500 text-sm my-1">{message}</p>
      
      {/* Movie Poster */}
      <img
        className="rounded-lg mb-4 w-full h-60 object-cover"
        src={imageUrl || '/src/assets/theatre.png'}
        alt={name}
      />

      {/* Movie Title */}
      <h2 className="text-xl font-semibold text-indigo-700 text-center">{name}</h2>

      {/* Movie Description */}
      <p className="text-sm text-gray-600 text-center mb-4">
        {description.length > 100 ? `${description.substring(0, 100)}...` : description}
      </p>

      {/* Movie Duration */}
      <p className="text-sm text-gray-500 text-center mb-4">Duration: {duration}</p>

      {/* Price */}
      <p className="text-lg font-medium text-green-500">₹{price}</p>
      
      {/* Watch Now Button */}
      <button onClick={handleAddCart}
        id="cart"
      className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition text-sm">
        Add to favourites
      </button>

      <button onClick={handleAddCart}
        id="order"
      className="px-4 py-2 my-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition text-sm">
        Book Now
      </button>
    </div>
  );
}

export default MovieCard;
