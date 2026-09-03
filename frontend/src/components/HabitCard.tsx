interface HabitCardProps {
    id?: string;
    title: string;
    streak: number;
    icon: string;
    completedToday?: boolean;
    onToggle?: () => void;
    onDelete?: () => void;
}

export default function HabitCard({
    title,
    streak,
    icon,
    completedToday = false,
    onToggle,
    onDelete,
}: HabitCardProps) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-gray-800 bg-gray-900 p-4 text-white shadow-sm transition hover:border-gray-700">
            <div className="flex items-center gap-3">
                {onToggle && (
                    <button
                        type="button"
                        onClick={onToggle}
                        className={`flex h-7 w-7 items-center justify-center rounded-lg border text-sm transition ${
                            completedToday
                                ? "bg-green-600 border-green-500 text-white shadow-sm"
                                : "border-gray-700 bg-gray-800 text-transparent hover:border-gray-600"
                        }`}
                        aria-label={completedToday ? "Mark habit incomplete" : "Mark habit complete"}
                    >
                        ✓
                    </button>
                )}

                <p className={`font-medium ${completedToday ? "text-gray-300" : "text-white"}`}>
                    <span className="mr-2 text-lg">{icon}</span>
                    {title}
                </p>
            </div>

            <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-sm font-medium text-amber-400 bg-amber-950/40 border border-amber-800/40 px-2.5 py-1 rounded-full">
                    <span>🔥</span> {streak} days
                </span>

                {onDelete && (
                    <button
                        onClick={onDelete}
                        title="Delete habit"
                        className="text-gray-500 hover:text-red-400 text-sm p-1 transition"
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
}