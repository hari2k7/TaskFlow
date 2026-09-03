import { Task } from "../types/task";

interface TaskCardProps {
  task: Task;
  onDelete?: (id: string) => void;
  onEdit?: (task: Task) => void;
}

function getStatusStyle(status: Task["status"]) {
  if (status === "done") {
    return "bg-green-950/60 text-green-400 border border-green-800/40";
  }

  if (status === "in-progress") {
    return "bg-blue-950/60 text-blue-400 border border-blue-800/40";
  }

  return "bg-gray-800 text-gray-300 border border-gray-700";
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
    return "bg-red-950/60 text-red-400 border border-red-800/40";
  }

  if (priority === "medium") {
    return "bg-amber-950/60 text-amber-400 border border-amber-800/40";
  }

  return "bg-emerald-950/60 text-emerald-400 border border-emerald-800/40";
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
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 shadow-sm transition hover:border-gray-700 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-white text-base">
            {task.title || "Untitled Task"}
          </h3>

          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(task)}
                className="text-xs text-gray-400 hover:text-blue-400 transition"
              >
                Edit
              </button>
            )}

            {onDelete && (
              <button
                onClick={() => onDelete(task.id)}
                className="text-xs text-gray-400 hover:text-red-400 transition"
              >
                Delete
              </button>
            )}
          </div>
        </div>

        {task.description && (
          <p className="mt-2 text-sm text-gray-400 leading-relaxed">
            {task.description}
          </p>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-800/80">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 text-xs">
            <span
              className={`rounded-full px-2.5 py-0.5 font-medium ${getStatusStyle(task.status)}`}
            >
              {getStatusLabel(task.status)}
            </span>

            <span
              className={`rounded-full px-2.5 py-0.5 font-medium ${getPriorityStyle(task.priority)}`}
            >
              {getPriorityLabel(task.priority)}
            </span>
          </div>

          {task.dueDate && (
            <p className="text-xs text-gray-500">
              Due: {task.dueDate}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}