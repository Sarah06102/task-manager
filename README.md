# MyTaskManager

A full-stack task management application built with the **MERN stack (MongoDB, Express, React, Node.js)**.  
This web application allows users to **register, log in, and perform full CRUD operations on tasks**, including creating, viewing, updating, and deleting tasks.  

Deployed here:  
- **Frontend (Vercel):** https://task-manager-xi-five-71.vercel.app/
- **Backend (Render):** https://task-manager-xvhd.onrender.com

---

## Features

- User authentication with **JWT** (Register / Login / Logout)
- Create, read, update, and delete tasks (CRUD)
- Task fields:  
  - `title` (required)  
  - `description` (optional)
  - `status` (`Incoming`, `In Progress`, `Completed`)  
  - `createdAt` 
- Responsive UI built with **React + Tailwind CSS**
- State management with React Hooks (useState, useEffect, useMemo)
- API connection to frontend using `fetch`
- MongoDB Atlas for storage

---

## Tech Stack

- **Frontend:** React, Vite, TailwindCSS, Vercel
- **Backend:** Node.js, Express, MongoDB Atlas, Render
- **Auth:** JSON Web Tokens (JWT) + bcrypt
- **Database:** MongoDB Atlas (cloud-hosted)

---

## Setup Instructions

### 1. Clone the Repository
- git clone https://github.com/<your-username>/task-manager.git
- cd task-manager

### 2. Install Dependencies
## Backend dependencies
- cd backend
- npm install

## Frontend dependencies
-cd ../frontend
- npm install

### 3. Environment Variables
Create an .env file in the backend with the following:
PORT=5050
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>

Create an .env file in the frontend with the following:
REACT_APP_API_URL=https://task-manager-xvhd.onrender.com

### 4. Running the Application Locally
## Starting the backend server
- cd backend
- npm start (or node index.js)

The backend local server will run at: http://localhost:5050

## Running the frontend
-cd frontend
- npm run dev
  
The frontend local server will run at: http://localhost:5174/


## API Endpoints
The API endpoints I created in the backend for this project are as follows:

**For User Auth:**
- `POST /api/users/register` → Register new user  
- `POST /api/users/login` → Login user  
- `GET /api/users/profile` → Get current user profile  

**For Tasks:**
- `POST /api/tasks` → Create a new task  
- `GET /api/tasks` → Retrieve all tasks  
- `GET /api/tasks/:id` → Retrieve a task by ID  
- `PUT /api/tasks/:id` → Update a task by ID  
- `DELETE /api/tasks/:id` → Delete a task by ID  

## Development Process
- Started with Node.js Express backend and MongoDB for the DB. I tested APIs in Postman.  
- Added JWT authentication for secure login and register.  
- Built React frontend with TailwindCSS for responsive UI.  
- Implemented CRUD operations using fetch.  
- Deployed backend on Render and frontend on Vercel. 

### Challenges & Learning
The challenges I ran into during this project include: 
- MongoDB Atlas IP issues when deploying backend on Render. 
- CORS errors when connecting Vercel frontend to Render backend.
- Also issue with CORS in development and had to switch ports from 5000 to 5050.
- Issue with connecting backend URL to frontend.

Overall, I was able to resolve all of these challeneges I faced through debugging and learned a lot throughout this process.

## Features I would add in the future
- Forgot password logic
- Calendar view
- Settings option for users to change their email, name or password
