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
    <main>
      <h1>TaskFlow</h1>

      <Link href="/dashboard">Go to Dashboard →</Link>
      
      {tasks.map((task)=>{
        return <TaskCard key={task.id} task={task}/>
      })}
    </main>
  );
}