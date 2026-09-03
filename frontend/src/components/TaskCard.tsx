import { Task } from "../types/task";

interface TaskCardProps {
    task: Task;
}

export default function TaskCard({task} : TaskCardProps){
    return(
        <div>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Proirity: {task.priority}</p>
            <p>Due: {task.dueDate}</p>
        </div>
    )
}