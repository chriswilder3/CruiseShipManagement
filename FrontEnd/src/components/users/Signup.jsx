import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // Adjust path as needed

function SignUp() {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const handleSignUp = async function (e) {
    e.preventDefault();

    const backEndUrl = "http://localhost:5000";
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const pass = formData.get("pass");

    console.log("Submission happening!");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      const newUser = userCredential.user;

      console.log("User was registered: ", newUser.id);

      // Now check whether this is the first user (i.e., deserves admin rights)
      const response = await fetch(`${backEndUrl}/checkAdmin`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid: newUser.id, email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg(
          data.isAdmin
            ? "You are successfully registered as Admin"
            : "You are registered as a guest."
        );
        navigate("/users/dashboard");
      } else {
        setErrorMsg(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      if (error.code === "auth/configuration-not-found") {
        console.error("Firebase configuration error:", error.message);
        setErrorMsg("Configuration error. Please contact support.");
      } else {
        console.error("Signup error:", error);
        setErrorMsg(error.message || "Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-white to-blue-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Create a new account
        </h1>
        {errorMsg && (
          <p className="bg-red-50 border border-red-400 text-red-600 rounded-md text-sm p-2 mb-4">
            {errorMsg}
          </p>
        )}

        {successMsg && (
          <p className="bg-green-50 border border-green-300 text-green-600 rounded-md text-sm p-2 mb-4">
            {successMsg}
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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="pass"
              placeholder="Enter your password"
              required
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <div className="mt-2">
              <label className="text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="mr-2"
                />
                Show Password
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md px-4 py-2 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <Link to="/users/signin" className="text-sky-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
