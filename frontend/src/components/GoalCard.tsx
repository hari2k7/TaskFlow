interface GoalCardProps {
    title: string;
    current: number;
    target: number;
}

export default function GoalCard({
    title,
    current,
    target,
}: GoalCardProps) {
    const percentage = Math.min(
        100,
        Math.round((current / target) * 100)
    );

    return (
       <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm">

            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        {title}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        {current} / {target} tasks completed
                    </p>
                </div>

                {/* Percentage */}
                <span className="text-sm font-semibold text-gray-700">
                    {percentage}%
                </span>
            </div>

            {/* Progress bar */}
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                    className="h-full rounded-full bg-gray-900 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                />
            </div>

            {/* Bottom text */}
            <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-gray-500">
                    Progress
                </span>

                <span className="font-medium text-gray-900">
                    {target - current > 0
                        ? `${target - current} tasks remaining`
                        : "Goal completed 🎉"}
                </span>
            </div>
        </div>
    );
}