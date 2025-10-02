import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API_URL || "https://task-manager-xvhd.onrender.com";

const Register = () => {
  // Initialize variables 
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  // Function to register the user (connected to register button in form)
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await fetch(`${API_BASE}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({firstName, lastName, email, password})
      });

      const isJSON = (response.headers.get("content-type") || "").includes("application/json");
      const data = isJSON ? await response.json().catch(() => null) : null;

      if (!response.ok) {
        setErrorMessage(data?.message || "Registration failed.");
        return;
      }

      if (!data?.token) {
        setErrorMessage("No token received from server.");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/dashboard");

    } catch (error) {
      setErrorMessage(error?.message || "Something went wrong.");
    }
  }

  return (
    <div className="bg-rose-100 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl grid md:grid-cols-2 overflow-hidden w-full shadow-xl">
            
            {/* Left visual panel */}
            <div className="bg-gradient-to-br from-rose-400 to-rose-500 flex flex-col items-center justify-center p-10">
                <h1 className="text-white font-semibold text-2xl">MyTaskManager</h1>
                <p className="mt-4 text-white/90">Plan → Track → Ship.</p>
                <ul className="mt-3 space-y-2 text-white/80 text-sm">
                    <li>• Create & assign tasks</li>
                    <li>• Update status in one click</li>
                    <li>• See progress at a glance</li>
                </ul>
            </div>

            {/* Right form panel */}
            <div className="flex items-center justify-center p-10 flex-col">
                <h1 className="text-2xl font-semibold text-rose-900">Register</h1>
                {/* Register form inputs */}
                <div className="mt-6 mb-6">
                  
                  {/* Input first name */}
                  <label className="text-sm mb-1">First Name</label>
                  <input name="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter your first name" required className="w-full bg-transparent border-0 border-b-2 border-rose-200 px-0 placeholder-neutral-400 placeholder:text-sm mb-2 focus:outline-none focus:ring-0 focus:border-rose-500 transition-colors duration-200"/>
                  
                  {/* Input last name */}
                  <label className="text-sm mb-1">Last Name</label>
                  <input name="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter your last name" required className="w-full bg-transparent border-0 border-b-2 border-rose-200 px-0 placeholder-neutral-400 placeholder:text-sm mb-2 focus:outline-none focus:ring-0 focus:border-rose-500 transition-colors duration-200"/>

                  {/* Input email */}
                  <label className="text-sm mb-1">Email</label>
                  <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required className="w-full bg-transparent border-0 border-b-2 border-rose-200 px-0 placeholder-neutral-400 placeholder:text-sm mb-2 focus:outline-none focus:ring-0 focus:border-rose-500 transition-colors duration-200"/>

                  {/* Input password */}
                  <label className="text-sm mb-1">Password</label>
                  <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required className="w-full bg-transparent border-0 border-b-2 border-rose-200 px-0 placeholder-neutral-400 placeholder:text-sm mb-2 focus:outline-none focus:ring-0 focus:border-rose-500 transition-colors duration-200"/>
                  
                  {errorMessage && <p className="text-sm text-rose-600 mb-3 text-center">{errorMessage}</p>}

                  {/* Submit button */}
                  <div className="flex justify-center">
                    <button onClick={handleRegister} className=" bg-rose-200 text-rose-900 rounded-3xl px-4 py-2 font-semibold cursor-pointer hover:bg-rose-300 hover:scale-105 ease-in-out duration-300 mt-3">Register</button>
                  </div>
                </div>
                <p className="text-sm mb-1">Already have an account?<button onClick={() => navigate("/login")} className="p-1 font-semibold rounded-xl text-rose-900 cursor-pointer hover:underline ease-in-out duration-300">Login</button></p>
            </div>
        </div>
    </div>
  )
}

export default Register