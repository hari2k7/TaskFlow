import StatCard from "@/src/components/StatCard"

export default function Dashboard() {
    return (
        <main>
            <h1>Dashboard</h1>
            <p>Welcome to your TaskFlow dashboard.</p>

            <div className="grid grid-cols-4 gap-4">
                <StatCard icon="📋" title="Tasks" value="12" subtitle="Today" />
                <StatCard icon="✓" title="Complete" value="8/12" subtitle="67%" />
                <StatCard icon="⏱" title="Focus" value="2h 40m" subtitle="Today" />
                <StatCard icon="🔥" title="Streak" value="7 days" subtitle="" />
            </div>
        </main>
    )
}