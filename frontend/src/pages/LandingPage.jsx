import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircleIcon, CalendarIcon, ChartBarIcon } from "@heroicons/react/24/outline";

const LandingPage = () => {
    const navigate = useNavigate()
    return (
        <div className="bg-rose-100 min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="flex flex-col justify-center items-center flex-grow text-center mb-24 pt-60">
                <h1 className="text-5xl font-bold text-rose-900 mb-4">MyTaskManager</h1>
                <p className="text-lg text-rose-700 mb-6">Organize tasks. Boost productivity. Simplify your life.</p>
                <button onClick={() => navigate("/register")} className="bg-rose-600 text-white px-6 py-2 rounded-lg shadow hover:bg-rose-700 cursor-pointer ease-in-out duration-300">
                    Get Started
                </button>
            </section>
        
            {/* Features Section */}
            <section className="bg-white py-16 px-8 mt-30">
                <h2 className="text-3xl font-bold text-center text-rose-900 mb-12">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Feature 1 */}
                <div className="bg-rose-50 p-6 rounded-xl shadow hover:shadow-lg transition">
                    <CheckCircleIcon className="h-12 w-12 text-rose-600 mb-4" />
                    <h3 className="text-xl font-semibold text-rose-900 mb-2">Easy Task Management</h3>
                    <p className="text-rose-700">Create, edit, and organize tasks effortlessly with a clean and intuitive interface.</p>
                </div>

                {/* Feature 2 */}
                <div className="bg-rose-50 p-6 rounded-xl shadow hover:shadow-lg transition">
                    <CalendarIcon className="h-12 w-12 text-rose-600 mb-4" />
                    <h3 className="text-xl font-semibold text-rose-900 mb-2">Stay on top of deadlines</h3>
                    <p className="text-rose-700">Never miss a task - upcoming deadlines are updated automatically so you always know what’s next.</p>
                </div>

                {/* Feature 3 */}
                <div className="bg-rose-50 p-6 rounded-xl shadow hover:shadow-lg transition">
                    <ChartBarIcon className="h-12 w-12 text-rose-600 mb-4" />
                    <h3 className="text-xl font-semibold text-rose-900 mb-2">Track Your Progress</h3>
                    <p className="text-rose-700">Visualize your productivity with progress tracking and simple analytics.</p>
                </div>
                </div>
            </section>
  
            {/* Footer */}
            <footer className="bg-rose-200 text-rose-800 py-3 text-center">© 2025 MyTaskManager. All rights reserved.</footer>
      </div>
    );
  };  

export default LandingPage