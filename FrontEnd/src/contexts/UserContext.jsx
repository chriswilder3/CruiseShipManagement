import React, { createContext, useContext, useEffect, useState } from "react";
import { getDoc, doc, collection } from "firebase/firestore";
import { useAuth } from "./AuthContext"; // Assuming AuthContext exists
import { db } from "../firebase"; // Ensure you import your Firebase config

const UserContext = createContext();

// Custom hook to access UserContext
export function useUser() {
  return useContext(UserContext);
}

// UserContextProvider Component
export function UserContextProvider({ children }) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    cart: null,
    orders: null,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const colRef = collection(db, "Users");
          const docRef = doc(colRef, currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();

            // Combine all cart items into a single array
            const totalCart = [
              ...(data.datacateringCart || []),
              ...(data.stationeryCart || []),
              ...(data.movieCart || []),
            ];

            // Combine all orders/bookings into a single array
            const totalOrders = [
              ...(data.cateringOrders || []),
              ...(data.stationeryOrders || []),
              ...(data.movieBookings || []),
              ...(data.salonBookings || []),
              ...(data.partyhallBookings || []),
              ...(data.gymBookings || []),
            ];

            setUserData({
              cart: totalCart,
              orders: totalOrders,
            });
          } else {
            console.log("No such user exists");
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      }
      setLoading(false); // Stop loading once data is fetched
    };

    fetchUserData();
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ userData, loading }}>
      {children}
    </UserContext.Provider>
  );
}
