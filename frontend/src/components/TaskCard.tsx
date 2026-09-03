import { Task } from "../types/task";

interface TaskCardProps {
  task: Task;
  onDelete?: (id: string) => void;
  onEdit?: (task: Task) => void;
}

function getStatusStyle(status: Task["status"]) {
  if (status === "done") {
    return "bg-green-100 text-green-700";
  }

  if (status === "in-progress") {
    return "bg-blue-100 text-blue-700";
  }

  return "bg-gray-100 text-gray-700";
}

function getStatusLabel(status: Task["status"]) {
  if (status === "in-progress") {
    return "In Progress";
  }

  if (status === "todo") {
    return "To Do";
  }

  return "Done";
}

function getPriorityStyle(priority: Task["priority"]) {
  if (priority === "high") {
    return "bg-red-100 text-red-700";
  }

  if (priority === "medium") {
    return "bg-yellow-100 text-yellow-700";
  }

  return "bg-green-100 text-green-700";
}

function getPriorityLabel(priority: Task["priority"]) {
  if (priority === "high") {
    return "High";
  }

  if (priority === "medium") {
    return "Medium";
  }

  return "Low";
}

export default function TaskCard({ task, onDelete, onEdit }: TaskCardProps) {
  return (
    <div className="rounded-lg border bg-white p-5 shadow-sm">

      <div className="flex gap-3">
        {onEdit && (
          <button
            onClick={() => onEdit(task)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
        )}

        {onDelete && (
          <button
            onClick={() => onDelete(task.id)}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        )}
      </div>

      <p className="mt-2 text-sm text-gray-600">
        {task.description}
      </p>

      <div className="mt-4 flex gap-3 text-sm">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(task.status)}`}
        >
          {getStatusLabel(task.status)}
        </span>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${getPriorityStyle(task.priority)}`}
        >
          {getPriorityLabel(task.priority)}
        </span>
      </div>

      <p className="mt-3 text-sm text-gray-500">
        Due: {task.dueDate}
      </p>

    </div>
  );
}