interface ProgressCardProps {
  completed: number;
  total: number;
}

function getDescription(completed: number, total: number): string {
  if (completed / total >= 0.6) {
    return "Keep going! You're doing great.";
  }

  return "Do the tasks!!";
}

export default function ProgressCard({
  completed,
  total,
}: ProgressCardProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Today's Progress</h2>
        <span className="text-sm font-semibold text-blue-400">{percentage}%</span>
      </div>

      <p className="mt-1 text-sm text-gray-400">
        {completed} / {total} tasks completed
      </p>

      <div className="mt-4 h-2.5 w-full rounded-full bg-gray-800 overflow-hidden">
        <div
          className="h-2.5 rounded-full bg-blue-600 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-3 text-sm text-gray-400">
        {getDescription(completed, total)}
      </p>
    </div>
  );
}