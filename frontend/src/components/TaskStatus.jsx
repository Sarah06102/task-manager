import React, { useMemo } from "react";

const COLORS = {
    // green for completed
    completed: "#90EE90",
    // blue for in progress   
    "in-progress": "#87CEEB", 
    // red for incoming
    incoming: "#F08080",    
};

// Status ring component
const StatusRing = ({ percent = 0, color = "#16a34a", label, valueText }) => {
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const clamped = Math.max(0, Math.min(100, percent));
    const offset = circumference * (1 - clamped / 100);

    return (
        <figure className="flex flex-col items-center">
            <svg width="96" height="96" viewBox="0 0 96 96" aria-label={`${label}: ${clamped}%`}>
                <circle cx="48" cy="48" r={radius} stroke="#e5e7eb" strokeWidth="10" fill="none" />
                <circle cx="48" cy="48" r={radius} stroke={color} strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} transform="rotate(-90 48 48)" style={{ transition: "stroke-dashoffset 400ms ease" }} />
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="18" fontWeight="700" fill="#111827">
                    {clamped}%
                </text>
            </svg>
            <figcaption className="mt-2 text-sm text-neutral-700">{label}</figcaption>
        </figure>
    );
}

// Task status container containing status ring
const TaskStatus = ({ tasks = [] }) => {
    const { total, counts, percent } = useMemo(() => {
        const counts = { incoming: 0, "in-progress": 0, completed: 0 };
        for (const t of tasks) {
            const s = t?.status || "incoming";
            if (counts[s] !== undefined) counts[s]++;
        }
        const total = tasks.length || 1;
        const percent = {
            incoming: Math.round((counts.incoming / total) * 100),
            "in-progress": Math.round((counts["in-progress"] / total) * 100),
            completed: Math.round((counts.completed / total) * 100),
        };
        return { total: tasks.length, counts, percent };
    }, [tasks]);
    
      return (
        <section className="bg-white rounded-xl shadow p-4 md:p-5 mt-10">
            <h3 className="font-semibold text-rose-900 mb-3">Task Status</h3>

            <div className="grid grid-cols-3 gap-3">
                <StatusRing percent={percent.incoming} color={COLORS.incoming} label="Incoming" />
                <StatusRing percent={percent["in-progress"]} color={COLORS["in-progress"]} label="In Progress" />
                <StatusRing percent={percent.completed} color={COLORS.completed} label="Completed" />
            </div>

            <ul className="mt-4 space-y-1 text-sm text-neutral-600">
                <li><span className="inline-block w-2 h-2 rounded-full mr-2" style={{background: COLORS.completed}} /> {counts.completed} completed</li>
                <li><span className="inline-block w-2 h-2 rounded-full mr-2" style={{background: COLORS["in-progress"]}} /> {counts["in-progress"]} in progress</li>
                <li><span className="inline-block w-2 h-2 rounded-full mr-2" style={{background: COLORS.incoming}} /> {counts.incoming} incoming</li>
                <li className="text-neutral-400 mt-1">{total} total</li>
            </ul>
        </section>    
    );
};

export default TaskStatus;