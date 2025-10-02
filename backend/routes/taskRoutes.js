// Routes created by connecting to apis created in taskController
import { Router } from 'express';
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

// Initialize express router
const router = Router();

// Route to create a task
router.post("/", protect, createTask);

// Route to retrive all tasks
router.get("/", protect, getTasks);

// Route to get a task by its id
router.get("/:id", protect, getTaskById);

// Route to update a task
router.put("/:id", protect, updateTask);

// Route to delete a task
router.delete("/:id", protect, deleteTask);

export default router;
