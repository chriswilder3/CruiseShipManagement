import React from 'react'

function Signin() {
    

    const handleSignIn = function (e) {
        e.preventDefault()
        console.log('Submit happening!');

        const backEndUrl = 'http://localhost:5000/'
        fetch(backEndUrl)
        .then( (res) =>{
            return res.json()
        })
        .then( (res) =>{
            console.log(res);
        })
    }
    
  return (
    <div>
        <h1>
            Sign into your account
        </h1>
        <form action="" method='get' onSubmit={handleSignIn} className='signin-form flex flex-col gap-4 *:p-3 '>
            <input type="text" placeholder=' Enter your username'/>
            <input type="password" name="" id="" placeholder='Enter your password'/>
            <button type='submit' className=' bg-sky-800  rounded-md text-white'>
                Submit
            </button>

        </form>
    </div>
  )
}

export default Signin