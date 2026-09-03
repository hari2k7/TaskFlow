import StatCard from "@/src/components/StatCard"
import { Task } from "@/src/types/task";
import TaskCard from "@/src/components/TaskCard";
import ProgressCard from "@/src/components/ProgressCard";

const tasks: Task[] = [
    {
        id: "task-001",
        title: "Learn TypeScript",
        description: "Learn TypeScript for TaskFlow",
        status: "in-progress",
        priority: "high",
        dueDate: "2026-09-05",
    },
    {
        id: "task-002",
        title: "Learn Next.js",
        description: "Learn the App Router",
        status: "todo",
        priority: "medium",
        dueDate: "2026-09-07",
    },
    {
        id: "task-003",
        title: "Build TaskFlow",
        description: "Build the task management application",
        status: "todo",
        priority: "high",
        dueDate: "2026-09-15",
    },
];

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
            <section className="mt-8">
                <h2 className="text-xl font-semibold">My Day</h2>
                <p className="text-sm text-gray-500">Tasks for today</p>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            </section>
            <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold">Today's Progress</h2>
                <p className="mt-2 text-sm text-gray-500">Percentage:</p>
                <ProgressCard completed={8} total={12} />
            </div>
        </main>
    )
}