import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'

function Dashboard() {
    const [role, setRole] = useState(null)

    useEffect( () => {
        const getUserRole = async function () {
            const auth = getAuth()
            const currentUser = auth.currentUser
            console.log(currentUser.uid)    
            if(currentUser){
                try{
                
                    const idTokenInfo = await currentUser.getIdTokenResult()
                    setRole(idTokenInfo.claims.role)
                    console.log(idTokenInfo.claims.role);
                }
                catch(error){
                    console.log(" Failed to connect.", error);
                }
            }
            else{
                alert("No user is currently signed in.");
                window.open('/users/signin')

            }
            
        }
        getUserRole();
    },[])



    if(!role){
        return <p> Loading... </p>
    }

  return (
    <div>
        {
            role === 'admin' && <p>Admin Dashboard </p>
        }
        {
            role === 'voyager' && <p>Voyager Dashboard </p>
        }
        
    </div>
  )
}


export default Dashboard