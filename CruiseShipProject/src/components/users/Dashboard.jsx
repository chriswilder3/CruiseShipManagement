import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'

function Dashboard() {
    const [role, setRole] = useState(null)

    useEffect( () => {
        const getUserRole = async function () {
            const auth = getAuth()
            const currentUser = auth.currentUser
            
            if(currentUser){
                const idTokenInfo = currentUser.getIdTokenResult()
                setRole(idTokenInfo.claims.role)
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