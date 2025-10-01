import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <div>
            <nav className="flex items-center justify-between bg-rose-400">
                {/* Name of application */}
                <button onClick={() => navigate("/")} className="font-bold text-rose-900 text-xl p-5 cursor-pointer">MyTaskManager</button>
                
                {/* Login/register buttons */}
                <div className="flex items-center gap-5">
                    <button onClick={() => navigate("/login")} className="bg-rose-200 text-rose-900 font-semibold rounded-2xl px-4 py-2  cursor-pointer hover:bg-rose-500 ease-in-out duration-300 hover:scale-110">Login</button>
                    <button onClick={() => navigate("/register")} className="bg-rose-200 text-rose-900 font-semibold rounded-2xl px-4 py-2 cursor-pointer hover:bg-rose-500 ease-in-out duration-300 hover:scale-110">Register</button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar