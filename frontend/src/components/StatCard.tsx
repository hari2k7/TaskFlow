
interface StatCardProps {
    icon: string;
    title: string;
    value: string;
    subtitle?: string;
}

export default function StatCard({ icon, title, value, subtitle }: StatCardProps) {
    return (
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 shadow-sm transition hover:border-gray-700">
            <div className="flex items-center justify-between">
                <span className="text-2xl">{icon}</span>
                {subtitle && (
                    <span className="text-xs font-medium text-gray-400 bg-gray-800/80 px-2 py-0.5 rounded">
                        {subtitle}
                    </span>
                )}
            </div>
            <h3 className="mt-3 text-sm font-medium text-gray-400">{title}</h3>
            <p className="mt-1 text-2xl font-bold text-white tracking-tight">{value}</p>
        </div>
    );
}