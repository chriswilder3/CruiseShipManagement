import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase';
import { collection, getDocs, doc, deleteDoc  } from 'firebase/firestore';
import { useAuth } from '../../../contexts/AuthContext';
import { useUser } from '../../../contexts/UserContext';

function ManagerDashboard() {
  const { currentUser, loading: authLoading } = useAuth();
  const { userData, loading: userLoading } = useUser();
  const [cateringOrdersData, setCateringOrdersData ] = useState([])
  const [stationeryOrdersData, setStationeryOrdersData ] = useState([])
  const [movieBookingsData, setMovieBookingsData ] = useState([])
  const [fitnessBookingsData, setFitnessBookingsData ] = useState([])
  const [salonBookingsData, setSalonBookingsData ] = useState([])
  const [partyhallBookingsData, setPartyhallBookingsData ] = useState([])

  const [ordersLoading, setOrdersLoading] = useState(true)
  const [successMsg, setSuccessMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [refreshOrders, setRefreshOrders] = useState(false)

  useEffect( () => {
    const fetchOrders = async (colName) => {
      const colRef = collection(db, colName)
      getDocs(colRef)
      .then( (querySnap) => {
          const data = querySnap.docs.map( (doc) => ({
              id : doc.id,
              ...doc.data()
          }))
          switch(colName)
          {
            case "CateringOrders":
                setCateringOrdersData(data)
            break;

            case "StationeryOrders":
                setStationeryOrdersData(data)
            break;

            case "MovieOrders":
                setMovieBookingsData(data)
            break;

            case "PartyhallOrders":
                setPartyhallBookingsData(data)
            break;
            
            case "FitnessOrders":
                setFitnessBookingsData(data)
            break;

            case "SalonOrders":
                setSalonBookingsData(data)
            break;


          }
      })
      .catch((err) => console.error('failed to fetch order data : ',err))
      
    }
    const helpFetchOrder = async () => {
        const colNames = ["CateringOrders","StationeryOrders","PartyhallOrders","MovieOrders","FitnessOrders","SalonOrders" ]
        const allFetchOrderPromises =  colNames.map((colName) => fetchOrders(colName))
        await Promise.all(allFetchOrderPromises)

        setOrdersLoading(false)
    }
    
  },[refreshOrders, currentUser.uid])

  const toggleCateringOrdersPopup = () => {
    const popup = document.querySelector(".catering-orders-popup");
    popup.classList.toggle("hidden");
    popup.classList.toggle("block");
  };

  const toggleStationeryOrdersPopup = () => {
    const popup = document.querySelector(".stationery-orders-popup");
    popup.classList.toggle("hidden");
    popup.classList.toggle("block");
  };
   
  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900">
        <p className="text-lg font-semibold text-white">You are not logged in.</p>
      </div>
    );
  }

  if (authLoading || userLoading || ordersLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900">
        <p className="text-lg font-semibold text-white">Loading...</p>
      </div>
    );
  }


  if( currentUser.role === "Manager"){
    
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 via-indigo-200 to-blue-100 flex flex-col items-center py-10">
      {/* User Info Section */}

      {/* Success Message Notification */}
      {showSuccess && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
            {successMsg}
          </div>
      )}

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

     
        <div className="relative">
        
        {/* Manager's popup showing Catering Orders  */}

          <div className="catering-orders-popup hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-8 rounded-lg shadow-lg md:w-2/5 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4 text-center">
              Catering orders
            </h2>
            <div className="space-y-4">
              {/* Listing all the order requests */}
              {cateringOrdersData.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-center p-3 rounded bg-gray-200"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      <span className='text-rose-400 text-base'> Order ID : </span>  {order.id}
                    </p>
                    <p className="text-sm font-semibold text-gray-700">
                      <span className='text-rose-400 text-base'> User ID : </span>  {order.uid}
                    </p>
                    <p className="text-sm font-semibold text-gray-700">
                      <span className='text-rose-400 text-base'> Item name : </span>  {order.name}
                    </p>
                    <p className="text-sm font-semibold text-gray-700">
                      <span className='text-rose-400 text-base'> Item price : </span> {order.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={toggleCateringOrdersPopup}
              className="w-full mt-6 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
            >
              Close
            </button>
          </div>
          
        {/* Manager's popup showing Stationery Orders  */}

          <div className="stationery-orders-popup hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-8 rounded-lg shadow-lg md:w-2/5 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4 text-center">
              Stationery orders
            </h2>
            <div className="space-y-4">
              {/* Listing all the order requests */}
              {stationeryOrdersData.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-center p-3 rounded bg-gray-200"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      <span className='text-rose-400 text-base'> Order ID : </span>  {order.id}
                    </p>
                    <p className="text-sm font-semibold text-gray-700">
                      <span className='text-rose-400 text-base'> User ID : </span>  {order.uid}
                    </p>
                    <p className="text-sm font-semibold text-gray-700">
                      <span className='text-rose-400 text-base'> Item name : </span>  {order.name}
                    </p>
                    <p className="text-sm font-semibold text-gray-700">
                      <span className='text-rose-400 text-base'> Item price : </span> {order.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={toggleStationeryOrdersPopup}
              className="w-full mt-6 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
            >
              Close
            </button>
          </div>

        </div>

        
          
        




      {/* HeadCook's duty related Buttons  */}
        <div className="flex flex-col md:flex-row my-5 gap-5 poppins">
          <div className="flex flex-col gap-3 bg-gradient-to-tr from-slate-800 via-gray-600 to-slate-500 rounded p-5 shadow-lg">
            <h1 className="text-xl text-rose-500"> Catering Orders</h1>
            <button
              type="button"
              onClick={toggleCateringOrdersPopup}
              className="p-2 my-2 bg-rose-500 text-white rounded-md hover:bg-rose-600"
            >
              View Details 
            </button>
          </div>

          <div className="flex flex-col gap-3 bg-gradient-to-tr from-slate-800 via-gray-600 to-slate-500 rounded p-5 shadow-lg">
            <h1 className="text-xl text-rose-500"> Stationery Orders</h1>
            <button
              type="button"
              onClick={toggleStationeryOrdersPopup}
              className="p-2 my-2 bg-rose-500 text-white rounded-md hover:bg-rose-600"
            >
              View Details 
            </button>
          </div>


        </div>

      {/* Managers own user Content */}
      
        <div className="w-full max-w-4xl mt-10">

        <h1 className="text-3xl font-bold text-indigo-600 mb-4 text-center capitalize">
          Your user role content
        </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Cart Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Your Cart</h2>
              <div className="flex flex-col gap-4">
                {userData.cart && userData.cart.length > 0 ? (
                  userData.cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center border rounded p-3 gap-4"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-gray-600">₹{item.price}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Your cart is empty.</p>
                )}
              </div>
            </div>

            {/* Orders Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Your Orders</h2>
              <div className="flex flex-col gap-4">
                {userData.orders && userData.orders.length > 0 ? (
                  userData.orders.map((order, index) => (
                    <div
                      key={index}
                      className="flex items-center border rounded p-3 gap-4"
                    >
                      <img
                        src={order.imageUrl}
                        alt={order.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">{order.name}</p>
                        <p className="text-gray-600">₹{order.price}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">You have no orders yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      
    </div>
  );
  }
}

export default ManagerDashboard