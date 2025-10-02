import React, { useEffect, useState } from 'react';
import SidePanel from '../components/SidePanel';
import { IoReorderThree } from "react-icons/io5";
import Tasks from '../components/Tasks';
import AddTaskModal from '../components/AddTaskModal';

const API_BASE = process.env.REACT_APP_API_URL || "https://task-manager-xvhd.onrender.com";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage("No token found, please log in again.");
        return;
      }
      try {
        const response = await fetch(`${API_BASE}/api/users/profile`, {
          headers: {Authorization: `Bearer ${token}`}
        });
        const data =  await response.json();

        if (!response.ok) {
          setErrorMessage(data?.message || "Failed to load profile.");
          return;
        }
        setUser(data.user);
      } catch (error) {
        setErrorMessage(error.message || "Something went wrong.");
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-rose-100"> 
      <div className="flex">
        <SidePanel isOpen={open} onClose={() => setOpen(false)} onAddTask={() => setAddOpen(true)}/>
        {/* Content area */}
        <main className="flex-1 p-4">
          {user && (
            <div className="bg-white rounded p-5 border-b border-neutral-300 h-25 w-full shadow flex items-center justify-between">
              {/* Left - Menu button for mobile + greeting */}
              <div className="flex items-center space-x-3">
                <button className="md:hidden p-2 rounded hover:bg-rose-50" onClick={() => setOpen(true)} aria-label="Open menu">
                  <IoReorderThree size={30} className="text-rose-900 cursor-pointer" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold">Hello, {user.firstName}!</h1>
                  <h1 className="text-sm text-neutral-500">Welcome to your personal task manager</h1>
                </div>
              </div>
            </div>
          )}
          <Tasks reload={reload}/>
        </main>

        <AddTaskModal open={addOpen} onClose={() => setAddOpen(false)} onCreated={(task) => {console.log("Created:", task); setAddOpen(false); setReload(r => r + 1);}} />
      </div>
    </div>
  );
}

export default Dashboard