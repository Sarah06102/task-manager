// Helper file to convert and format the date and time
export const toDatetimeLocal = (iso) => {
    if (!iso) return "";
    const day = new Date(iso);
    const pad = (n) => String(n).padStart(2, "0");
    return `${day.getFullYear()}-${pad(day.getMonth()+1)}-${pad(day.getDate())}T${pad(day.getHours())}:${pad(day.getMinutes())}`;
};

export const toISO = (localValue) => localValue ? new Date(localValue).toISOString() : null;