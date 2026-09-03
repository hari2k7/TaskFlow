interface HabitCardProps {
    title: string;
    streak: number;
    icon: string;
}

export default function HabitCard({
    title,
    streak,
    icon,
}: HabitCardProps) {
    return (
        <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 text-gray-900 shadow-sm">
            
            <p className="font-medium">
                {icon} {title}
            </p>

            <p className="text-sm text-gray-600">
                🔥 {streak} days
            </p>

        </div>
    );
}