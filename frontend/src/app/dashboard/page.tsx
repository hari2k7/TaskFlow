import StatCard from "@/src/components/StatCard"
import { Task } from "@/src/types/task";
import TaskCard from "@/src/components/TaskCard";
import ProgressCard from "@/src/components/ProgressCard";
import GoalCard from "@/src/components/GoalCard";
import HabitCard from "@/src/components/HabitCard";
import FocusCard from "@/src/components/FocusCard";
import UpcomingCard from "@/src/components/UpcomingCard";
import ProductivityChart from "@/src/components/ProductivityChart";

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

const productivityData = [
  { day: "Mon", value: 80 },
  { day: "Tue", value: 95 },
  { day: "Wed", value: 60 },
  { day: "Thu", value: 85 },
  { day: "Fri", value: 70 },
  { day: "Sat", value: 40 },
  { day: "Sun", value: 90 },
];

export default function Dashboard() {
    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
                <p className="mt-1 text-gray-400">Welcome to your TaskFlow productivity command center.</p>
            </div>

            {/* Quick Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon="📋" title="Tasks" value="12" subtitle="Today" />
                <StatCard icon="✓" title="Complete" value="8/12" subtitle="67%" />
                <StatCard icon="⏱" title="Focus" value="2h 40m" subtitle="Today" />
                <StatCard icon="🔥" title="Streak" value="7 days" subtitle="Active" />
            </div>

            {/* Main Dashboard Layout (2-Column Grid) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left / Primary Column (Tasks, Goals, Chart) */}
                <div className="lg:col-span-7 xl:col-span-8 space-y-8">
                    {/* My Day (Tasks) */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-xl font-semibold text-white">My Day</h2>
                                <p className="text-sm text-gray-400">Focus tasks for today</p>
                            </div>
                            <span className="text-xs font-medium text-blue-400 bg-blue-950/60 border border-blue-800/40 px-2.5 py-1 rounded-full">
                                {tasks.length} active
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {tasks.map((task) => (
                                <TaskCard key={task.id} task={task} />
                            ))}
                        </div>
                    </section>

                    {/* Goals Section */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-xl font-semibold text-white">Goals Progress</h2>
                                <p className="text-sm text-gray-400">Track milestones and key targets</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <GoalCard
                                title="Complete Project"
                                current={8}
                                target={12}
                                category="Work"
                            />
                            <GoalCard
                                title="Learn TypeScript"
                                current={6}
                                target={10}
                                category="Development"
                            />
                        </div>
                    </section>

                    {/* Weekly Productivity Chart */}
                    <section>
                        <ProductivityChart data={productivityData} />
                    </section>
                </div>

                {/* Right / Sidebar Column (Timer, Progress, Habits, Deadlines) */}
                <div className="lg:col-span-5 xl:col-span-4 space-y-6">
                    {/* Focus Timer */}
                    <section>
                        <FocusCard title="Focus Session" duration={50} />
                    </section>

                    {/* Progress Card */}
                    <section>
                        <ProgressCard completed={8} total={12} />
                    </section>

                    {/* Habits List */}
                    <section className="rounded-xl border border-gray-800 bg-gray-900 p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-base font-semibold text-white">Today's Habits</h2>
                            <span className="text-xs text-gray-400">{habits.length} habits</span>
                        </div>

                        <div className="flex flex-col gap-2.5">
                            {habits.map((habit) => (
                                <HabitCard key={habit.id} title={habit.title} streak={habit.streak} icon={habit.icon} />
                            ))}
                        </div>
                    </section>

                    {/* Upcoming Deadlines */}
                    <section className="rounded-xl border border-gray-800 bg-gray-900 p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-base font-semibold text-white">Upcoming Deadlines</h2>
                        </div>

                        <div className="flex flex-col gap-2.5">
                            {upcomingTasks.map((task) => (
                                <UpcomingCard
                                    key={task.id}
                                    title={task.title}
                                    dueDate={task.dueDate}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}