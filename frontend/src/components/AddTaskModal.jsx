import React, { useState } from "react";
import { toISO, toDatetimeLocal } from "../utils/date";
import PriorityTabsSelector from "./PriorityTabsSelector";

const AddTaskModal = ({ open, onClose, onCreated }) => {
    if (!open) return null;
    const [title, setTitle] = useState("");
    const [desc, setDesc]   = useState("");
    const [due, setDue]     = useState("");
    const [status, setStatus] = useState("incoming");
    const [priority, setPriority] = useState("medium");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!title || !due) {
            setError("Title and due date are required.")
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await fetch("/api/tasks", {
                method: "POST",
                headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
                body: JSON.stringify({title, description: desc || undefined, dueDate: toISO(due), status, priority}),
            });
            const data = await response.json().catch(() => null);
            if (!response.ok) {
                setError(data?.message || "Failed to create task.");
                return;
            }
            onCreated?.(data.task);
            onClose();
        } catch (error) {
            setError(error.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div aria-modal="true" role="dialog" className="fixed inset-0 z-50 flex items-center justify-center">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30" onClick={onClose} />
                
                {/* Panel */}
                <div className="relative z-10 w-[92vw] max-w-md md:max-w-lg rounded-2xl bg-white p-5 shadow-xl">
                    {/* Modal header */}
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-semibold text-rose-900">Add Task</h2>
                        <button onClick={onClose} className="p-2 rounded hover:bg-rose-50 cursor-pointer ease-in-out duration-300" aria-label="Close">✕</button>
                    </div>
                    
                    {/* Add task form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Form inputs */}
                        <div>
                            <label className="text-sm block mb-1">Title</label>
                            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-transparent border-0 border-b-2 border-rose-200 focus:border-rose-500 focus:outline-none placeholder-neutral-400 placeholder:text-sm" placeholder="Enter task title" />
                        </div>

                        <div>
                            <label className="text-sm block mb-1">Description</label>
                            <input value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full bg-transparent border-0 border-b-2 border-rose-200 focus:border-rose-500 focus:outline-none placeholder-neutral-400 placeholder:text-sm" placeholder="Enter description (optional)" />
                        </div>

                        <div>
                            <label className="text-sm block mb-1">Due</label>
                            <input type="datetime-local" value={due} onChange={(e) => setDue(e.target.value)} className="w-full bg-transparent text-sm border-0 border-b-2 border-rose-200 focus:border-rose-500 focus:outline-none" />
                        </div>

                        <div>
                            <label className="text-sm block mb-1">Status</label>
                            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full text-sm bg-transparent border-0 border-b-2 border-rose-200 focus:border-rose-500 focus:outline-none">
                                <option value="incoming">Incoming</option>
                                <option value="in-progress">In progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm block mb-1">Priority</label>
                            <PriorityTabsSelector value={priority} onChange={setPriority} />
                        </div>
                        
                        {error && <p className="text-sm text-rose-600">{error}</p>}
                        
                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={onClose} className="px-3 py-2 rounded bg-rose-100 text-rose-900 hover:bg-rose-200 cursor-pointer ease-in-out duration-300">Cancel</button>
                            <button disabled={loading} className="px-3 py-2 rounded bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50 cursor-pointer ease-in-out duration-300">
                            {loading ? "Saving..." : "Create"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddTaskModal