import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase'; // Adjust path as needed

function SignUp() {
    const [ errorMsg, setErrorMsg] = useState()
    const handleSignUp = async function () {
        
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-white to-blue-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">Create a new account</h1>
        {errorMsg && (
          <p className="bg-red-50 border border-red-400 text-red-600 rounded-md text-sm p-2 mb-4">
            {errorMsg}
          </p>
        )}
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <input
            type="password"
            name="pass"
            placeholder="Enter your password"
            required
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md px-4 py-2 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?
          <Link to="/users/signin" className="text-sky-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
