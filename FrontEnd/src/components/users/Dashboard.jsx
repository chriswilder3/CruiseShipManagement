import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase"
import { reauthenticateWithPhoneNumber } from "firebase/auth";
import { collection, getDoc, doc } from 'firebase/firestore';

function Dashboard() {
  const { currentUser, loading } = useAuth();
  const [ cart, setCart ] = useState(null)
  

  // If currentuser exists.
  useEffect( () => {
      const fetchCartsOrders = async () => {
        
        if(currentUser){
              const colRef = collection(db,"Users")
              try{
                const docRef = doc(colRef,currentUser.uid)
                const docSnap = await getDoc(docRef)
                
                
                // We got the data
                if(docSnap.exists()){
                  setCart(docSnap.data())
                }
              }
              catch(err){
                console.error('Database fetch error',err);
              }
        }
        else{
          console.log('current user is not logged in');
        }

      }
      fetchCartsOrders()
  },[])

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900">
        <p className="text-lg font-semibold text-white">You are not logged in.</p>
      </div>
    );
  }


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900">
        <p className="text-lg font-semibold text-white">Loading...</p>
      </div>
    );
  }

  

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 via-indigo-200 to-blue-100 flex flex-col items-center py-10">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4 text-center capitalize">
          {currentUser.role} Dashboard
        </h1>
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-2">
            Welcome, <span className="font-semibold text-indigo-600">{currentUser.email}</span>!
          </p>
          <p className="text-lg text-gray-700">
            Your role is <span className="font-semibold text-indigo-600">{currentUser.role}</span>.
          </p>
        </div>
      </div>

      {
        currentUser.role === 'Guest' && <div>
            <div className="grid grid-cols-4 gap-10 justify-center items-center" >
                 
                 {/* Cart Display */}
                <div className=" p-3 ">
                  <h1>
                    Your cart :
                  </h1>
                  <div className="flex flex-col">
                    {
                      cart ===null ? "": (cart.stationeryCart.map( (item,index) =>
                      <div key={index} className="cart">
                          {item}
                      </div>
                      ))
                      
                    }
                    
                  </div>
                </div>

                {/* Orders Display  */}
                <div className="p-3">
                  <h1>
                    Your orders :
                  </h1>
                  <div className="flex flex-col gap-2">
                    <div className="orders"></div>
                  </div>
                </div>

            </div>
        </div>
      }
    </div>
  );
}

export default Dashboard;