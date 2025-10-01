import React from 'react'
import { PiDotsThreeOutlineFill } from "react-icons/pi";

const Tasks = () => {
  return (
    <div>
        {/* Upcoming deadlines */}
        <div className="flex flex-wrap flex-col gap-4 mt-5">
            <h1 className="font-bold text-xl">Upcoming Deadlines</h1>
            <div className="w-72 bg-white rounded-2xl shadow p-4">
                <div className="flex flex-row items-center justify-between">
                    <h1 className="font-bold">Task Name</h1>
                    <PiDotsThreeOutlineFill className="mr-2 text-neutral-700"/>
                </div>
               
                <h2 className="text-sm text-neutral-500 mt-1">Task description</h2>
                <p className="flex items-center justify-between text-xs text-neutral-500 mt-3">Status</p>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-[11px] px-2 py-1 rounded-md bg-rose-50 text-rose-700">Date</span>
                </div>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Incoming */}
            <section className="mt-10">
                <div className="min-w-0 rounded-xl border border-rose-300 bg-rose-200/60 p-3 min-h-[360px]">
                    <h1 className="font-bold text-xl mb-3">Incoming</h1>
                    
                    <div className="w-full bg-white rounded-2xl shadow p-4">
                        <div className="flex flex-row items-center justify-between">
                            <h1 className="font-bold">Task Name</h1>
                            <PiDotsThreeOutlineFill className="mr-2 text-neutral-700"/>
                        </div>
                    
                        <h2 className="text-sm text-neutral-500 mt-1">Task description</h2>
                        <p className="flex items-center justify-between text-xs text-neutral-500 mt-3">Status</p>

                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-[11px] px-2 py-1 rounded-md bg-rose-50 text-rose-700">Date</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* In progress */}
            <section className="mt-10">
                <div className="rounded-xl border border-rose-300 bg-rose-200/60 p-3 min-h-[360px]">
                    <h1 className="font-bold text-xl mb-3">In Progress</h1>
                    
                    <div className="w-full bg-white rounded-2xl shadow p-4">
                        <div className="flex flex-row items-center justify-between">
                            <h1 className="font-bold">Task Name</h1>
                            <PiDotsThreeOutlineFill className="mr-2 text-neutral-700"/>
                        </div>
                    
                        <h2 className="text-sm text-neutral-500 mt-1">Task description</h2>
                        <p className="flex items-center justify-between text-xs text-neutral-500 mt-3">Status</p>

                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-[11px] px-2 py-1 rounded-md bg-rose-50 text-rose-700">Date</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Completed */}
            <section className="mt-10">
                <div className="rounded-xl border border-rose-300 bg-rose-200/60 p-3 min-h-[360px]">
                    <h1 className="font-bold text-xl mb-3">Completed</h1>
                    
                    <div className="w-full bg-white rounded-2xl shadow p-4">
                        <div className="flex flex-row items-center justify-between">
                            <h1 className="font-bold">Task Name</h1>
                            <PiDotsThreeOutlineFill className="mr-2 text-neutral-700"/>
                        </div>
                    
                        <h2 className="text-sm text-neutral-500 mt-1">Task description</h2>
                        <p className="flex items-center justify-between text-xs text-neutral-500 mt-3">Status</p>

                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-[11px] px-2 py-1 rounded-md bg-rose-50 text-rose-700">Date</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default Tasks