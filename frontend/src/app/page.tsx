import { Task } from "../types/task";
import TaskCard from "../components/TaskCard";

const task: Task = {
  id: "task-001",
  title: "Learn TypeScript",
  description: "Learn TypeScript for TaskFlow",
  status: "in-progress",
  priority: "high",
  dueDate: "2026-09-05",
}
export default function Home() {
  return (
    <main>
      <h1>TaskFlow</h1>
      <TaskCard task={task}/>
    </main>
  );
}