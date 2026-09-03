interface GoalCardProps {
    id?: string;
    title: string;
    current: number;
    target: number;
    category?: string;
    onIncrement?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

export default function GoalCard({
    title,
    current,
    target,
    category,
    onIncrement,
    onEdit,
    onDelete,
}: GoalCardProps) {
    const percentage = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;
    const isCompleted = current >= target;

    return (
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-sm transition hover:border-gray-700">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    {category && (
                        <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">
                            {category}
                        </span>
                    )}
                    <h2 className="text-lg font-semibold text-white">
                        {title}
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                        {current} / {target} completed
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    {/* Percentage badge */}
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        isCompleted
                            ? "bg-green-950/80 text-green-400 border border-green-800/50"
                            : "bg-blue-950/80 text-blue-400 border border-blue-800/50"
                    }`}>
                        {percentage}%
                    </span>

                    {onDelete && (
                        <button
                            onClick={onDelete}
                            title="Delete goal"
                            className="text-gray-500 hover:text-red-400 p-1 text-sm transition"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-gray-800">
                <div
                    className={`h-full rounded-full transition-all duration-500 ${
                        isCompleted ? "bg-green-500" : "bg-blue-600"
                    }`}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            {/* Bottom text & actions */}
            <div className="mt-4 flex items-center justify-between text-sm">
                <span className="font-medium text-gray-300">
                    {isCompleted ? (
                        <span className="text-green-400 font-semibold flex items-center gap-1">
                            ✓ Goal achieved! 🎉
                        </span>
                    ) : (
                        <span className="text-gray-400">
                            {target - current} remaining
                        </span>
                    )}
                </span>

                <div className="flex items-center gap-2">
                    {onIncrement && !isCompleted && (
                        <button
                            onClick={onIncrement}
                            className="rounded-lg bg-gray-800 px-2.5 py-1 text-xs font-medium text-gray-200 hover:bg-gray-700 hover:text-white transition"
                        >
                            +1 Step
                        </button>
                    )}
                    {onEdit && (
                        <button
                            onClick={onEdit}
                            className="text-xs text-gray-400 hover:text-blue-400 transition"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}