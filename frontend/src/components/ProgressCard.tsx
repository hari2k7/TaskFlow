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
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Today's Progress</h2>

      <p className="mt-2 text-sm text-gray-500">
        {completed} / {total} tasks completed
      </p>

      <div className="mt-4 h-3 w-full rounded-full bg-gray-200">
        <div
          className="h-3 rounded-full bg-blue-600"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-3 text-sm text-gray-600">
        {getDescription(completed, total)}
      </p>
    </div>
  );
}