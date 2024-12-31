import React, { useState } from 'react'
import { db} from '../../../firebase'
import { useAuth } from '../../../contexts/AuthContext';
import { collection, doc,getDoc, addDoc, updateDoc } from 'firebase/firestore';

function ItemCard({name,itemId, desc, price}) {
    const [message, setMessage] = useState('')
    const { currentUser } = useAuth()

    // console.log(name, desc, price,id, currentUser);

    

    const handleAddCart = (e) => {
        const cartOrOrder = e.target.getAttribute('id')
        console.log(cartOrOrder);

        console.log(currentUser);
        if(currentUser){
            
            const colRef = collection(db,'Users')
            const docRef = doc(colRef, currentUser.uid)
            getDoc(docRef)
            .then( (docSnap) => 
                {
                    console.log('user Exists', docSnap.exists())
                    if(cartOrOrder==='cart')
                    {   
                        const cart = docSnap.data().stationeryCart
                        console.log('userStationery cart : ', cart )
                        cart.push(itemId)
                        updateDoc(docRef, {
                            stationeryCart : cart
                        })
                        .then( (resp) => console.log('Successfuly added to cart'))
                        .catch((err) => console.error('Error while adding to cart', err))
                    }else{
                        const orders = docSnap.data().stationeryOrders
                        console.log('userStationery Order : ',orders )
                        orders.push(itemId)
                        updateDoc(docRef, {
                            stationeryOrders : orders
                        })
                        .then( (resp) => {
                            setMessage('Successfuly added to cart. Redirecting to checkout')
                            // windows.open('/users/stationery/checkout,'_self')
                        })
                        .catch((err) => console.error('Error while adding to Orders', err))
                    }
                }
            )
            .catch(
                (err) =>
                console.log('Error while adding item to user cart.', err)
            )
            
        }
        else{
            setMessage('You are not logged in. redirecting...');
            setTimeout(()=>(window.open('/users/signin','_self')), 
            500)
        }
    }
  return (
    <div className="flex flex-col justify-between items-center bg-white rounded-lg shadow-lg p-4 space-y-4 transform transition hover:scale-105 hover:shadow-lg">
        {/* Item Name */}
        <p className='text-blue-500 text-sm'>
            {message}
        </p>
        <h1 className="text-lg font-semibold roboto text-gray-800 text-center">
            {name}
        </h1>

        {/* Item Image */}
        <img 
            className="w-36 h-36 object-cover rounded-lg" 
            src="/src/assets/stationery.png" 
            alt="Food item image" 
        />

        {/* Item Description */}
        <p className="text-sm text-gray-600 text-center">
            {desc}
        </p>

        {/* Price */}
        <p className="text-lg font-medium text-green-500">
            ₹{price}
        </p>

        {/* Add to Cart Button */}
        <button onClick={handleAddCart}
          id='cart'  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-sm"
        >
            Add to Cart
        </button>
    </div>

  )
}

export default ItemCard