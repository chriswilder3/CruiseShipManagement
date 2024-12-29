import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'

function Dashboard() {
    const [role, setRole] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        const getUserRole = async function () {
            const auth = getAuth()
            const currentUser = auth.currentUser
            console.log(currentUser.uid)    
            if(currentUser){
                try{
                
                    const idTokenInfo = await currentUser.getIdTokenResult()
                    const userRole = idTokenInfo.claims.role
                    console.log(" user claims : ", idTokenInfo.claims);
                    setRole(userRole)

                }
                catch(error){
                    console.log(" Failed to connect.", error);
                }
                finally{
                    setLoading(false)
                    console.log("your role : ",role);
                }
            }
            else{
                alert("No user is currently signed in.");
                window.open('/users/signin', '_self')

            }
            
        }
        getUserRole();
    },[])



    if(loading){
        return <p> Loading... </p>
    }

  return (
    <div>
        {
            role === 'Admin' && <p> Admin Dashboard </p>
        }
        {
            role === 'Guest' && <p>Voyager Dashboard </p>
        }
        
    </div>
  )
}


export default Dashboard