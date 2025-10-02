import React, { useRef, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const links = [
    { label: "Overview", href: "/dashboard" },
    { label: "Tasks",    href: "/dashboard/tasks" },
    { label: "Support",  href: "/dashboard/support" },
    { label: "Settings",  href: "/dashboard/settings" },
];

const SidePanel = ({ isOpen, onClose, onAddTask }) => {
    const overviewRef = useRef(null);
    const tasksRef = useRef(null);
    const [active, setActive] = useState("overview");

    const scrollToRef = (ref, hash) => {
        if (!ref?.current) return;
        const headerOffset = 0;
        const top = ref.current.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    
        window.scrollTo({ top, behavior: "smooth" });
        // Update URL
        history.replaceState(null, "", `#${hash}`);
    };

    const goOverview = () => window.scrollTo({ top: 0, behavior: "smooth" });
    const goTasks = () => scrollToRef(tasksRef, "tasks");

    // Go to URL hash when page first loaded 
    useEffect(() => {
        const hash = window.location.hash.replace("#", "");
        const map = { overview: overviewRef, tasks: tasksRef };
        const ref = map[hash];
        if (ref?.current) {
          setTimeout(() => scrollToRef(ref, hash), 0);
        }
    }, []);

    // Highlight the active section as you scroll   
    useEffect(() => {
        const opts = { rootMargin: "-50% 0px -50% 0px", threshold: 0 };
        const map = [
          ["overview", overviewRef],
          ["tasks", tasksRef],
        ];
        const io = new IntersectionObserver((entries) => {
            // pick the entry most in view
            const visible = entries
            .filter(e => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (!visible) return;
            const id = visible.target.getAttribute("data-id");
            setActive(id);
        }, opts);
  
      map.forEach(([id, ref]) => ref.current && io.observe(ref.current));
      return () => io.disconnect();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    return (
        <>
            {/* Side Panel */}
            <aside className={`
                fixed md:static z-40 min-h-screen w-64 bg-white border-r border-neutral-300 transition-transform duration-200
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}>
                {/* Header */}
                <div className="flex items-center justify-between px-4 h-14 border-b border-neutral-300">
                    <span className="font-bold text-rose-900">MyTaskManager</span>
                    <button onClick={onClose} className="md:hidden p-2 rounded hover:bg-rose-50 cursor-pointer ease-in-out duration-300">
                        <IoClose size={20} className="text-rose-900 cursor-pointer" />
                    </button>
                </div>

                {/* Buttons */}
                {/* Overview button */}
                <button className={`w-full text-left px-3 py-2 rounded ${active === "overview" ? "bg-rose-100" : "hover:bg-rose-50"}`} onClick={goOverview}>
                    Overview
                </button>

                {/* Tasks button */}
                <button className={`w-full text-left px-3 py-2 rounded mt-1 ${active === "tasks" ? "bg-rose-100" : "hover:bg-rose-50"}`} onClick={goTasks}>
                    Tasks
                </button>

                {/* Add task button */}
                <div className="flex flex-col justify-center items-center">
                    <button onClick={onAddTask} className="mt-2 w-60 px-3 py-2 rounded bg-rose-600 text-white font-medium hover:bg-rose-700 cursor-pointer ease-in-out duration-300">
                        Add Task
                    </button>

                    {/* Logout button */}
                    <button className="mt-4 w-60 px-3 py-2 rounded bg-rose-100 text-rose-900 font-medium hover:bg-rose-200 cursor-pointer ease-in-out duration-300" onClick={handleLogout}>
                        Logout
                    </button>
                </div>

                {/* Content */}
                <main className="flex-1 space-y-10 p-4">
                    {/* Give sections a scroll margin so anchors/scroll offset land nicely */}
                    <section ref={overviewRef} data-id="overview"  tabIndex={-1} className="scroll-mt-24"></section>

                    <section ref={tasksRef} data-id="tasks" tabIndex={-1} className="scroll-mt-24"></section>
                </main>
            </aside>
        </>
    )
}

export default SidePanel