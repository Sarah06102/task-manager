// PriorityTabsSelector.jsx
const TABS = ["low", "medium", "high"];

const PriorityTabsSelector = ({ value = "medium", onChange }) => {
    return (
        <div className="inline-flex rounded-full overflow-hidden shadow-lg">
            {TABS.map((tab, i) => { 
                const active = value === tab;
                return (
                    <button key={tab} type="button" onClick={() => onChange(tab)} className={`px-5 py-2 text-sm font-semibold transition-all duration-300 cursor-pointer
                        ${active ? "bg-rose-700 text-white" : "bg-rose-500 text-white hover:bg-rose-700"}
                        ${i !== 0 ? "border-l border-white" : ""}
                        ${i === 0 ? "rounded-l-full" : ""}
                        ${i === TABS.length - 1 ? "rounded-r-full" : ""}`}>
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                );
            })}
        </div>
    );
}
  
export default PriorityTabsSelector;