import { Task } from "../types/task";
import TaskCard from "../components/TaskCard";
import Link from "next/link";

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

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white p-8 max-w-5xl mx-auto flex flex-col justify-center">
      <div className="text-center py-12">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          TaskFlow
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
          Modern full-stack productivity & task management system. Stay focused, track goals, and build lasting habits.
        </p>
        <div className="mt-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-500"
          >
            Open Dashboard →
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-300 mb-4">Sample Tasks Preview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </main>
  );
}