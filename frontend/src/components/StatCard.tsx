
interface StatCardProps {
    icon: string;
    title: string;
    value: string;
    subtitle: string;
}

export default function StatCard({icon, title, value, subtitle} : StatCardProps){
    return (
        <div className="rounded-lg border bg-white p-5 shadow-sm">
            <h2>{icon} {title}</h2>
            <p>{value}</p>
            <p>{subtitle}</p>
        </div>
    )
}