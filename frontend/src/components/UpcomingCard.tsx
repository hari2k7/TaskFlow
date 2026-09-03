interface UpcomingCardProps {
  title: string;
  dueDate: string;
}

export default function UpcomingCard({ title, dueDate }: UpcomingCardProps) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-4 shadow-sm transition hover:border-gray-700">
      <p className="font-medium text-white flex items-center gap-2">
        <span>📌</span>
        <span>{title}</span>
      </p>
      <p className="mt-2 text-xs text-gray-400">Due: {dueDate}</p>
    </div>
  );
}