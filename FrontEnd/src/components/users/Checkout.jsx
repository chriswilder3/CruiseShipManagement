import React, { useEffect, useRef, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { useAuth } from "../../contexts/AuthContext";

function Checkout() {
  const { userData, loading: userLoading } = useUser();
  const { currentUser, loading: authLoading } = useAuth();
  const [cartSubTotal, setCartSubTotal] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [cartContents, setCartContents] = useState([]);
  const quantityRefs = useRef([])

  useEffect(() => {
    if (userData) {
      setCartContents(userData.cart);
    }
  }, [userData]);

  useEffect(() => {
    if (cartContents && cartContents.length > 0) {
      setCartCount(cartContents.length);
      const total = cartContents.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0);
      setCartSubTotal(total);
    } else {
      setCartCount(0);
      setCartSubTotal(0);
    }
  }, [cartContents]);

  const handleChangeQuantity = (index) => {
    
    const changedQuantityVal = Number(quantityRefs.current[index].value)

    console.log(index, changedQuantityVal);

    // const prevCartContents = cartContents

    // prevCartContents[index] = {...prevCartContents[index],quantity : changedQuantityVal }

    // console.log(cartContents);
    // console.log(prevCartContents);


    // cartContents.forEach( (item))

    // const docRef = doc(collection(db, "Users"),currentUser.uid)

    // updateDoc(docRef, {

    // })
  }

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
          Checkout
        </h1>

        {/* Cart Summary */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8 w-11/12 max-w-4xl">
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium text-gray-700">
              Total Items: <span className="font-bold text-indigo-600">{cartCount}</span>
            </p>
            <p className="text-lg font-medium text-gray-700">
              Subtotal: <span className="font-bold text-green-600">₹{cartSubTotal}</span>
            </p>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex flex-col gap-4 w-11/12 max-w-4xl overflow-y-auto max-h-96">
          {cartContents && cartContents.length > 0 ? (
            cartContents.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white p-4 shadow-sm rounded-lg"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                  <p className="text-md font-bold text-green-600">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => handleChangeQuantity(index)} id={index} className="p-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
                    Change Qty
                  </button>

                  {/* We Use UseRef's array called quantityRefs to save
                  reference to each input field at each index */}
                  <input
                    ref={(currentElemRef) => (quantityRefs.current[index]= currentElemRef) }
                    className="p-2 border rounded-lg w-16 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="number"
                    defaultValue={item.quantity}
                    min={1}
                  />
                  <button className="p-2 bg-rose-500 text-white rounded-lg shadow hover:bg-rose-600 transition">
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
          )}
        </div>
      </div>
    );
  }

  return null;
}

export default Checkout;
