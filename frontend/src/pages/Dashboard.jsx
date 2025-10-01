import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage("No token found, please log in again.");
        return;
      }
      try {
        const response = await fetch("/api/users/profile", {
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
    <div className="bg-rose-100 h-screen">
      {user &&
      <div className="bg-white p-5 border-1 border-neutral-300">
        <h1 className="text-2xl font-bold">Hello, {user.firstName}!</h1>
        <h1 className="text-sm text-neutral-500">Welcome to your personal task manager</h1>
      </div>
      }
    </div>
  )
}

export default Dashboard