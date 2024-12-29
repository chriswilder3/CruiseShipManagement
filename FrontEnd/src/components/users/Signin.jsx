import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // Adjust path as needed

function SignIn() {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const pass = formData.get("pass");

    try {
      // Attempt to sign in the user
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;
      console.log("User signed in:", user.uid);

      // Navigate to dashboard after successful sign-in
      navigate("/users/dashboard");
    } catch (err) {
      console.error("Sign-in error:", err);
      setErrorMsg("Invalid email or password. Please try again.");
    }
  };

  return (
    <div>
      <h1>Sign in to your account</h1>
      {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
      <form onSubmit={handleSignIn} className="signin-form flex flex-col gap-4">
        <input type="email" name="email" placeholder="Enter your email" required />
        <input type="password" name="pass" placeholder="Enter your password" required />
        <button type="submit" className="bg-sky-800 rounded-md text-white">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
