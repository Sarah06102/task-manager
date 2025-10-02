import React, { useEffect, useState, useMemo } from "react";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import TaskSettingsModal from "./TaskSettingsModal";
import TaskStatus from "./TaskStatus";

const API_BASE = process.env.REACT_APP_API_URL;

const PRIORITY_STYLES = {
    high:   "bg-red-50 text-red-700",
    medium: "bg-amber-50 text-amber-700",
    low:    "bg-emerald-50 text-emerald-700",
};

// Code chunk for a column where draggable cards can be dropped
const DroppableColumn = ({ id, title, children }) => {
    const { setNodeRef, isOver } = useDroppable({ id });
  
    return (
        <section className="mt-10">
            <div className={`rounded-xl border border-rose-300 bg-rose-200/60 p-3 transition ${isOver ? "outline-2 outline-rose-400" : ""}`}>
                <h3 className="font-bold text-xl mb-3">{title}</h3>
    
                {/* Scroll area for cards */}
                <div ref={setNodeRef} className="space-y-3 overflow-y-auto no-scrollbar pr-1" style={{ maxHeight: "60vh"}}>
                    {children}
                </div>
            </div>
        </section>
    );
};

// Code chunk for a draggable card
const DraggableCard = ({ task, children }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: task._id });
    const style = transform
        ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
        : undefined;
  
    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className={`cursor-grab active:cursor-grabbing ${isDragging ? "opacity-70" : ""}`}>
            {children}
        </div>
    );
};

// Format the due date and time
const formatDue = (iso) => {
    if (!iso) return { label: "No date", title: "" };
  
    const date = new Date(iso);
  
    // Inline label
    const label = date.toLocaleString(undefined, {
        month: "short", day: "numeric", year: "numeric",
        hour: "numeric", minute: "2-digit"
    });
  
     // Inline title
    const title = date.toLocaleString(undefined, {
        weekday: "short", month: "long", day: "numeric", year: "numeric",
        hour: "numeric", minute: "2-digit", second: "2-digit"
    });
  
    return { label, title };
    };

    const createdAgo = (iso) => {
        const d = new Date(iso);
        const diffSec = (Date.now() - d.getTime()) / 1000;
        const abs = d.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
        if (diffSec > 7 * 24 * 3600) return { label: abs, title: abs };
        if (diffSec < 60) return { label: `${Math.floor(diffSec)}s ago`, title: abs };
        const m = diffSec / 60; if (m < 60) return { label: `${Math.floor(m)}m ago`, title: abs };
        const h = m / 60; if (h < 24) return { label: `${Math.floor(h)}h ago`, title: abs };
        const dDays = h / 24; return { label: `${Math.floor(dDays)}d ago`, title: abs };
  };

// Code chunk for each task card
const TaskCard = ({ task, onActions }) => {
    const { label: dueLabel, title: dueTitle } = formatDue(task.dueDate);
    const { label, title } = createdAgo(task.createdAt);
  
    return (
      <div className="w-full bg-white rounded-2xl shadow p-4">
        <div className="flex items-center justify-between">
            <h3 className="font-bold">{task.title}</h3>
            <button
                onClick={() => onActions?.(task)}
                // prevent drag
                onMouseDown={(e) => e.stopPropagation()} 
                onTouchStart={(e) => e.stopPropagation()}>
                <PiDotsThreeOutlineFill className="text-neutral-700 hover:text-neutral-500 cursor-pointer" />
            </button>
        </div>
        {task.description && <p className="text-sm text-neutral-500 mt-1">{task.description}</p>}
        <p className="text-xs text-neutral-500 mt-3">
          Status: {task.status?.replace("_", " ") || "incoming"}
        </p>
        <div className="mt-4 flex items-center justify-between">
            <span title={dueTitle} className="text-[11px] px-2 py-1 rounded-md bg-rose-50 text-rose-700">
                {dueLabel}
            </span>
            {task.priority && (
                <span className={`text-[11px] px-2 py-1 rounded-md ${PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.medium}`}>
                {task.priority.toUpperCase()}
                </span>
            )}
        </div>
        <p className="text-[11px] text-neutral-400 mt-1" title={title}>Created {label}</p>
      </div>
    );
};

// Code chunk for smaller task cards (for upcoming tasks section)
const SmallTaskCard = ({ task, onActions }) => (
    <div className="w-full bg-white rounded-2xl shadow p-4">
        <div className="flex items-center justify-between">
            <h3 className="font-semibold truncate">{task.title}</h3>
            <button className="p-1" onClick={() => onActions?.(task)}>
                <PiDotsThreeOutlineFill className="text-neutral-700 hover:text-neutral-500 cursor-pointer" />
            </button>
        </div>
  
        {task.description && (
            <p className="text-xs text-neutral-500 mt-1 line-clamp-2">{task.description}</p>
        )}
  
        <p className="text-[11px] text-neutral-500 mt-2">
            Status: {task.status?.replace('_',' ') || 'incoming'}
        </p>

        {/* Due date + priority */}
        <div className="mt-3 flex items-center gap-2">
            <span className="inline-block text-[11px] px-2 py-1 rounded-md bg-rose-50 text-rose-700">
                {new Date(task.dueDate).toLocaleString(undefined, {
                    month: "short", day: "numeric", year: "numeric",
                    hour: "numeric", minute: "2-digit"
                })}
            </span>
            {task.priority && (
                <span className={`text-[11px] px-2 py-1 rounded-md ${PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.medium}`}>
                    {task.priority.toUpperCase()}
                </span>
            )}
        </div>
    </div>
);
  
// Code chunk for all the tasks 
const Tasks = ({ reload = 0 }) => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");
    const [actionsOpen, setActionsOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const openActions = async (task) => {
        setSelectedTask(task);
        setActionsOpen(true);
        // Get task by id when modal opened
        const refreshedTask = await refetchTask(task._id);
        // Set selected task to refreshed task
        if (refreshedTask) setSelectedTask(refreshedTask);
    };

    const refetchTask = async (id) => {
        try {
            const token = localStorage.getItem("token");
            // Fetch task by id
            const response = await fetch(`${API_BASE}/api/tasks/${id}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error("Failed to refetch task");
            const { task } = await response.json();
            setTasks(prev => prev.map(t => (t._id === id ? task : t)));
            return task;
        } catch (e) {
            console.error(e);
        }
     };
    
    const handleUpdated = (updated) => {
        setTasks(prev => prev.map(t => (t._id === updated._id ? updated : t)));
        refetchTask(updated._id);
    };
    
    const handleDeleted = (id) => {
        setTasks(prev => prev.filter(t => t._id !== id));
    };

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

    useEffect(() => {
        const run = async () => {
          setError("");
          try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_BASE}/api/tasks`, { headers: { Authorization: `Bearer ${token}` } });
            const data = await res.json();
            if (!res.ok) { setError(data?.message || "Failed to load tasks."); return; }
            setTasks(Array.isArray(data.tasks) ? data.tasks : []);
          } catch (e) { setError(e.message || "Failed to load tasks."); }
        };
        run();
    }, [reload]);

    // Group all tasks
    const incoming = tasks.filter(t => (t.status || "incoming") === "incoming");
    const inProgress = tasks.filter(t => (t.status || "in-progress") === "in-progress");
    const completed = tasks.filter(t => (t.status || "completed") === "completed");

    // All tasks that have a due date, sorted soonest → latest
    const dueTasks = useMemo(() => {
        return tasks
        .filter(t => t.dueDate)
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }, [tasks]);

    const moveTask = async (taskId, toStatus) => {
        setTasks(prev => prev.map(t => t._id === taskId ? { ...t, status: toStatus } : t));
        try {
            const token = localStorage.getItem("token");
            // Fetch task by id
            await fetch(`${API_BASE}/api/tasks/${taskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ status: toStatus }),
            });
            refetchTask(taskId);
        } catch (error) {
            console.error(error);
        }
    };

    const onDragEnd = (event) => {
        const { over, active } = event;
        if (!over) return;
        const taskId = active.id;
        const targetStatus = over.id;
        // Only update if status actually changed
        const t = tasks.find(t => t._id === taskId);
        if (t && t.status !== targetStatus) moveTask(taskId, targetStatus);
    };

    return (
        <div>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                {/* Upcoming Deadlines + stats */}
                <section className="mt-6">
                    <h2 className="font-bold text-xl mb-3">Upcoming Deadlines</h2>
                    {/* Scrollable deadlines box */}
                    <div className="overflow-x-auto bg-rose-200/40 w-150 rounded-xl p-4">
                        <div className="flex flex-nowrap gap-4">
                        {dueTasks.length ? (
                            dueTasks.map(t => (
                                <div key={t._id} className="flex-none w-72 pr-4">
                                    <SmallTaskCard task={t} onActions={openActions}/>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-neutral-500">No dated tasks yet.</p>
                        )}
                        </div>
                    </div>
                </section>

                <TaskStatus tasks={tasks}/>
                
                {/* Columns for different status's */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Incoming */}
                    <DroppableColumn id="incoming" title="Incoming">
                    {incoming.length ? incoming.map(t => (
                        <DraggableCard key={t._id} task={t}>
                            <TaskCard task={t} onActions={openActions} />
                        </DraggableCard>
                    )) : <p className="text-sm text-neutral-500">No tasks yet.</p>}
                    </DroppableColumn>

                    {/* In Progress */}
                    <DroppableColumn id="in-progress" title="In Progress">
                    {inProgress.length ? inProgress.map(t => (
                        <DraggableCard key={t._id} task={t}>
                            <TaskCard task={t} onActions={openActions} />
                        </DraggableCard>
                    )) : <p className="text-sm text-neutral-500">No tasks yet. Add a new task or drag and drop an incoming one.</p>}
                    </DroppableColumn>

                    {/* Completed */}
                    <DroppableColumn id="completed" title="Completed">
                    {completed.length ? completed.map(t => (
                        <DraggableCard key={t._id} task={t}>
                            <TaskCard task={t} onActions={openActions} />
                        </DraggableCard>
                    )) : <p className="text-sm text-neutral-500">No tasks yet.</p>}
                    </DroppableColumn>
                </div>
            </DndContext>
            <TaskSettingsModal open={actionsOpen} task={selectedTask} onClose={() => setActionsOpen(false)} onUpdated={handleUpdated} onDeleted={handleDeleted} />
        </div>
    );
};
    
export default Tasks;