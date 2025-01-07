import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { doc,getDoc, updateDoc, addDoc,collection } from 'firebase/firestore';
import { db } from '../../../../firebase'

function MovieCard({ itemId, name, description, imageUrl, duration, price, screenNumber }) {
  const [message, setMessage] = useState("");
  const { currentUser } = useAuth();
  const [showBookingPopup, setShowBookingPopUp] = useState(false);

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
      let newItem;
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            const existingMovieCart = userData.movieCart
            console.log('existing cart : ',existingMovieCart);
            // const cartOrOrderArray = "cateringCart"
            // const currentArray = userData[cartOrOrderArray] || [];

            let itemExistAlready = false
            let itemIndex;

            existingMovieCart.forEach( (item,index) => {
              if(item.itemId === itemId){
                itemExistAlready = true
                itemIndex = index
                console.log("item :", item);
              }
            })

            if(itemExistAlready){
              existingMovieCart[itemIndex].quantity +=1
            }
            else{
              newItem = { itemId, name, imageUrl, price, quantity:1 };
              existingMovieCart.push(newItem)
            }
            console.log('existing cart : ',existingMovieCart);

            updateDoc(docRef,{
              movieCart : existingMovieCart
            })
            .then(()=>{
              
              const successMessage = "Successfully added to cart."
              setMessage(successMessage);

              if(cartOrOrder === 'order'){
                window.open('/users/checkout',"_self")
              }
            })
            .catch((err) => {console.error(err);})

          } else {
            setMessage("User document not found.");
          }
        })
        .catch((err) => {
          console.error("Error while fetching user document:", err);
          setMessage("Failed to add item. Please try again.");
        });

        
    }
  }

  const handleBookingPopUp = () => {
      setShowBookingPopUp(true)
  }

  const closeBookingPopup = () => {
    setTimeout(() => {
      setShowBookingPopUp(false)
    },1500) 
  }

  return (
    <div onMouseLeave={closeBookingPopup} className="flex flex-col bg-white rounded-lg shadow-md p-6 transition transform hover:scale-105 hover:shadow-lg">
      
      <p className="text-blue-500 text-sm my-1">{message}</p>

      <h2 className="text-blue-500 text-2xl font-medium poppins my-1">Screen-{screenNumber}</h2>
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
      <button onClick={handleBookingPopUp}
        id="cart"
      className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition text-sm">
        Add to Cart
      </button>

      <button onClick={handleBookingPopUp} 
        id="order"
      className="px-4 py-2 my-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition text-sm">
        Book Now
      </button>
      <div className='relative'>
        <div className={` ${showBookingPopup?"block":"hidden"} absolute z-10 -top-10`}>
            <TicketBookingPopUp screenNumber={screenNumber} />
        </div>
      </div>
    </div>
  );
}

export default MovieCard;



function TicketBookingPopUp({screenNumber}){
  const [seatingsLoading, setSeatingsLoading] = useState(true)
  const [seatingsArray, setSeatingsArray] = useState([])

  useEffect( () =>{
    const fetchSeatings = () => {
      const docRef = doc(collection(db,"movieSeatings"),"screens")
      getDoc(docRef)
      .then((seating) => {
          const seatingData = seating.data()[screenNumber]
          console.log(seatingData);
          setSeatingsArray(seatingData)
          
      })
      .catch( (err) => {
          console.log(err);
      })

    }
    setSeatingsLoading(false)
    fetchSeatings()

  },[])

  
  if(seatingsLoading){
    return <p className='bg text-center text-indigo-500 '> loading... </p>
  }

  return (
    <div className='bg-slate-300 p-3 '>
      <h2 className='text-2xl text-indigo-600 poppins '>
        Book Seats on Screen-{screenNumber}
      </h2> 
      <div className='mx-auto flex flex-row gap-2'>
        {
          seatingsArray.map( (seat,index) => {
            
              return <div key={index} className='p-1 w-3 h-3 bg-red-300'>
                  {seat}
              </div>
            
          })
        }
      </div> 

    </div>
  )
}