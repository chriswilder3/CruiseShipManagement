import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'

function Signin() {
    
    const [errorMsg, setErrorMsg] = useState()
    const navigate = useNavigate()

    const handleSignIn = async function (e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const user = formData['user']
        const pass = formData['pass']
        console.log('Submit happening! : ', user, ' ', pass);

        const backEndUrl = 'http://localhost:5000/'

        try{
            const response = await fetch(backEndUrl,
                {
                    method : 'post',
                    headers : {
                        'Content-Type': 'application/json'
                    },
                    body : JSON.stringify({user, pass})
                })

            if(response.ok ){
                const data = await response.json()
                console.log('Login Successful : ', data);
                navigate('/dashboard')
            }
            else{
                const errData = await response.json()
                setErrorMsg(errData.message || 'Login failed')
            }
        }
        catch( error){
            console.error('Error during sign-in:', error);
            setErrorMsg('An error occurred. Please try again later.');
        }

    }
    
  return (
    <div>
        <h1>
            Sign into your account
        </h1>
        {/* onSubmit={handleSignIn} */}
         {errorMsg && <p className='text-red-400 text-sm'> {{errorMsg}} </p> }
        <form action="" method='post' onSubmit={handleSignIn}  className='signin-form flex flex-col gap-4 *:p-3 '>
            <input type="text" name="user" placeholder=' Enter your username'/>
            <input type="password" name="pass" id="" placeholder='Enter your password'/>
            <button type='submit' className=' bg-sky-800  rounded-md text-white'>
                Submit
            </button>

        </form>
    </div>
  )
}

export default Signin