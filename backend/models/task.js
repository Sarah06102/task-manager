import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ""
    },
    dueDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["incoming", "in-progress", "completed"],
        default: "incoming",
        index: true
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
        index: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;