import StatCard from "@/src/components/StatCard"
import { Task } from "@/src/types/task";
import TaskCard from "@/src/components/TaskCard";
import ProgressCard from "@/src/components/ProgressCard";
import GoalCard from "@/src/components/GoalCard";
import HabitCard from "@/src/components/HabitCard";
import FocusCard from "@/src/components/FocusCard";
import UpcomingCard from "@/src/components/UpcomingCard";

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

const habits = [
    {
        id: "habit-001",
        title: "Drink Water",
        streak: 5,
        icon: "💧",
    },
    {
        id: "habit-002",
        title: "Read",
        streak: 3,
        icon: "📚",
    },
    {
        id: "habit-003",
        title: "Exercise",
        streak: 7,
        icon: "🏃",
    },
];

const upcomingTasks = [
    {
        id: "upcoming-001",
        title: "Learn TypeScript",
        dueDate: "Sep 5, 2026",
    },
    {
        id: "upcoming-002",
        title: "Learn Next.js",
        dueDate: "Sep 7, 2026",
    },
    {
        id: "upcoming-003",
        title: "Build TaskFlow",
        dueDate: "Sep 15, 2026",
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

            <ProgressCard completed={8} total={12} />
            <section className="mt-8">
                <h2 className="text-xl font-semibold">Goals</h2>
                <p className="text-sm text-gray-500">Track your progress</p>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <GoalCard
                        title="Complete Project"
                        current={8}
                        target={12}
                    />
                    <GoalCard
                        title="Learn Typescript"
                        current={6}
                        target={10}
                    />
                </div>
            </section>

            <section className="mt-8">
                <h2 className="text-xl font-semibold">Today's Habits</h2>
                <p className="text-sm text-gray-500">Keep your streak going</p>

                <div className="mt-4 flex flex-col gap-2">
                    {habits.map((habit) => {
                        return <HabitCard key={habit.id} title={habit.title} streak={habit.streak} icon={habit.icon} />
                    })}
                </div>
            </section>

            <FocusCard title="Focus Session" duration={50} />

            <section className="mt-8">
                <h2 className="text-xl font-semibold">Upcoming</h2>
                <p className="text-sm text-gray-500">What's coming up</p>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {upcomingTasks.map((task) => (
                        <UpcomingCard
                            key={task.id}
                            title={task.title}
                            dueDate={task.dueDate}
                        />
                    ))}
                </div>
            </section>
        </main>
    )
}