import React, { useEffect, useState } from "react";
import { toISO, toDatetimeLocal } from "../utils/date";
import PriorityTabsSelector from "./PriorityTabsSelector";

const API_BASE = process.env.REACT_APP_API_URL || "https://task-manager-xvhd.onrender.com";

const TaskSettingsModal = ({ open, task, onClose, onUpdated, onDeleted }) => {
  if (!open || !task) return null;

  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate.slice(0,10) : "");
  const [status, setStatus] = useState(task.status || "incoming");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Keep form in sync when task changes
  useEffect(() => {
    setTitle(task.title || "");
    setDescription(task.description || "");
    setDueDate(toDatetimeLocal(task.dueDate));
    setStatus(task.status || "incoming");
    setPriority(task.priority || "medium");
    setError("");
  }, [task]);

  // Update task
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      // Fetch task by id
      const response = await fetch(`${API_BASE}/api/tasks/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, description, dueDate: toISO(dueDate), status, priority }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) return setError(data?.message || "Failed to update task.");
      onUpdated?.(data.task);
      onClose();
    } catch (error) {
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Delete task
  const handleDelete = async () => {
    if (!confirm("Delete this task?")) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      // Fetch task by id
      const response = await fetch(`${API_BASE}/api/tasks/${task._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) return setError(data?.message || "Failed to delete task.");
      onDeleted?.(task._id);
      onClose();
    } catch (error) {
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div aria-modal="true" role="dialog" className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative z-10 w-[92vw] max-w-md rounded-2xl bg-white p-5 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-rose-900">Task Settings</h2>
          <button onClick={onClose} className="p-2 rounded hover:bg-rose-50 cursor-pointer ease-in-out duration-300">✕</button>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Form inputs */}
          <div>
              <label className="text-sm block mb-1">Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-transparent border-0 border-b-2 border-rose-200 focus:border-rose-500 focus:outline-none placeholder-neutral-400 placeholder:text-sm" placeholder="Enter task title" />
          </div>

          <div>
              <label className="text-sm block mb-1">Description</label>
              <input value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-transparent border-0 border-b-2 border-rose-200 focus:border-rose-500 focus:outline-none placeholder-neutral-400 placeholder:text-sm" placeholder="Enter description (optional)" />
          </div>

          <div>
              <label className="text-sm block mb-1">Due</label>
              <input type="datetime-local" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full bg-transparent text-sm border-0 border-b-2 border-rose-200 focus:border-rose-500 focus:outline-none" />
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

          <div className="flex justify-between items-center">
            <button type="button" onClick={handleDelete} className="px-3 py-2 rounded bg-red-50 text-red-700 hover:bg-red-100 cursor-pointer ease-in-out duration-300">
              Delete
            </button>
            <div className="flex gap-2">
              <button type="button" onClick={onClose}
                className="px-3 py-2 rounded bg-rose-100 text-rose-900 hover:bg-rose-200 cursor-pointer ease-in-out duration-300">Cancel</button>
              <button disabled={loading}
                className="px-3 py-2 rounded bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50 cursor-pointer ease-in-out duration-300">
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskSettingsModal;
