import React, { useState } from "react";
import { db } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";
import { collection, doc, addDoc, getDoc, updateDoc } from "firebase/firestore";

function ItemCard({ name, itemId, desc, price, imageUrl }) {
  const [message, setMessage] = useState("");
  const { currentUser } = useAuth();

  const handleAddCart = (e) => {
    const cartOrOrder = e.target.getAttribute("id");

    if (currentUser) {
      let colRef = collection(db, "Users");
      const docRef = doc(colRef, currentUser.uid);

      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            const cartOrOrderArray = cartOrOrder === "cart" ? "stationeryCart" : "stationeryOrders";
            const currentArray = userData[cartOrOrderArray] || [];

            // Prepare the new item data
            const newItem = { itemId, name, imageUrl, price };

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
                      colRef = collection(db, "StationeryOrders")
                      addDoc(colRef, { 
                          itemId, name, imageUrl, price, uid : currentUser.uid
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

      

    } else {
      setMessage("You are not logged in. Redirecting...");
      setTimeout(() => window.open("/users/signin", "_self"), 500);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center bg-white rounded-lg shadow-lg p-4 space-y-4 transform transition hover:scale-105 hover:shadow-lg">
      {/* Item Name */}
      <p className="text-blue-500 text-sm">{message}</p>
      <h1 className="text-lg font-semibold roboto text-gray-800 text-center">{name}</h1>

      {/* Item Image */}
      <img
        className="w-36 h-36 object-cover rounded-lg"
        src={imageUrl}
        alt="Item image"
      />

      {/* Item Description */}
      <p className="text-sm text-gray-600 text-center">{desc}</p>

      {/* Price */}
      <p className="text-lg font-medium text-green-500">₹{price}</p>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddCart}
        id="cart"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-sm"
      >
        Add to Cart
      </button>

      {/* Add to Orders Button */}
      <button
        onClick={handleAddCart}
        id="order"
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition text-sm"
      >
        Place Order
      </button>
    </div>
  );
}

export default ItemCard;
