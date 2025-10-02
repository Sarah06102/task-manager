// Logic for user tasks
import Task from "../models/task.js"

// Creates a new task
export const createTask = async (req, res) => {
    try {
        const {title, description, dueDate, status, priority} = req.body;
        
        if (!title || !dueDate) {
            return res.status(400).json({message: "Title and due date are required."});
        }

        const normalizedStatus = status === 'in_progress' ? 'in-progress' : status === 'in-progress' ? 'in-progress' : status === 'completed' ? 'completed' : 'incoming';
        const p = (priority || "").toString().toLowerCase();
        const normalizedPriority = ["low", "medium", "high"].includes(p) ? p : "medium";

        const task = await Task.create({
            title,
            description: description || "",
            dueDate,
            status: normalizedStatus,
            priority: normalizedPriority,
            user: req.userId
        });
        return res.status(201).json({task});
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Server error creating task."})
    }
};

// Retrives all tasks
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({user: req.userId}).sort({createdAt: -1});
        return res.json({tasks});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Server error fetching tasks."});
    }
};

// Retrives task by ID
export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({_id: req.params.id, user: req.userId});
        if (!task) return res.status(404).json({message: "Task not found."});
        
        return res.json({task});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Server error fetching task."})
    }
};

// Updates task by ID
export const updateTask = async (req, res) => {
    try {
        const {title, description, dueDate, status, priority} = req.body;

        const updates = {};
        if (title !== undefined) updates.title = title;
        if (description !== undefined) updates.description = description;
        if (dueDate !== undefined) updates.dueDate = dueDate;

        if (status !== undefined) {
            updates.status =
                status === "in_progress" ? "in-progress" :
                status === "in-progress" ? "in-progress" :
                status === "completed" ? "completed" : "incoming";
        }
      
        if (priority !== undefined) {
            const p = String(priority).toLowerCase();
            updates.priority = ["low", "medium", "high"].includes(p) ? p : "medium";
        }
        
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!task) return res.status(404).json({message: "Task not found."});
        return res.json({task});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Server error updating task."});
    }
};

// Deletes task by ID
export const deleteTask =  async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, user: req.userId});
        if (!task) return res.status(404).json({message: "Task not found."});

        return res.json({message: "Task deleted successfully."});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Server error deleting task."})
    }
};