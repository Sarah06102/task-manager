import React from 'react'
import { IoClose } from "react-icons/io5";

const links = [
    { label: "Overview", href: "/dashboard" },
    { label: "Tasks",    href: "/dashboard/tasks" },
    { label: "Add Task", href: "/dashboard/new" },
    { label: "Support",  href: "/dashboard/support" },
    { label: "Settings",  href: "/dashboard/settings" },
];

const SidePanel = ({ isOpen, onClose }) => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }

    return (
        <>
        {/* Panel */}
            <aside className={`
                fixed md:static z-40 h-screen w-64 bg-white border-r border-neutral-300 transition-transform duration-200
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}>
                {/* Header */}
                <div className="flex items-center justify-between px-4 h-14 border-b border-neutral-300">
                    <span className="font-bold text-rose-900">MyTaskManager</span>
                    <button onClick={onClose} className="md:hidden p-2 rounded hover:bg-rose-50">
                        <IoClose size={20} className="text-rose-900 cursor-pointer" />
                    </button>
                </div>

                {/* Nav */}
                <nav className="p-3 text-sm"> {links.map((l) => (
                        <a key={l.href} href={l.href} className="block px-3 py-2 rounded hover:bg-rose-50 text-rose-900">
                            {l.label}
                        </a>
                    ))}
                    <button className="mt-4 w-full px-3 py-2 rounded bg-rose-100 text-rose-900 font-medium hover:bg-rose-200 cursor-pointer" onClick={handleLogout}>
                        Logout
                    </button>
                </nav>
            </aside>
        </>
    )
}

export default SidePanel