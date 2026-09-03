interface UpcomingCardProps {
  title: string;
  dueDate: string;
}

export default function UpcomingCard({title,dueDate}: UpcomingCardProps) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <p className="font-medium">📌 {title}</p>
      <p className="mt-2 text-sm text-gray-500">{dueDate}</p>
    </div>
  );
}