// Initialize express
// Connect to db
// Load middleware
// Mount user routes
// Start server
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
await connectDB();

// Create app
const app = express();

// Middleware
app.use(cors({
    origin: [ 
        'http://localhost:5174', 
        'https://task-manager-xi-five-71.vercel.app/'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: false,
    allowedHeaders: ['Content-Type', 'Authorization']
})); 
app.use(express.json());

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Error handler
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));