"use client";

import { useState } from "react";
import { Task } from "@/src/types/task";

interface TaskFormProps {
    onTaskCreated: (task: {
        title: string;
        description: string;
        priority: string;
        status: string;
        dueDate: string;
    }) => void;
    initialTask?: Task;
    onCancel: () => void;
}

export default function TaskForm({
    onTaskCreated,
    initialTask,
    onCancel,
}: TaskFormProps) {
    const [title, setTitle] = useState(initialTask?.title ?? "");
    const [description, setDescription] = useState(
        initialTask?.description ?? ""
    );
    const [priority, setPriority] = useState(
        initialTask?.priority ?? ""
    );
    const [status, setStatus] = useState(
        initialTask?.status ?? "todo"
    );
    const [dueDate, setDueDate] = useState(
        initialTask?.dueDate ?? ""
    );

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        onTaskCreated({
            title,
            description,
            priority,
            status,
            dueDate,
        });
    }

    return (
        <div className="w-full max-w-2xl rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white">
                    {initialTask ? "Edit Task" : "Create Task"}
                </h2>
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 transition text-sm"
                    aria-label="Close"
                >
                    ✕
                </button>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor="title"
                        className="mb-2 block text-sm font-medium text-gray-300"
                    >
                        Title
                    </label>

                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter task title"
                        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="mb-2 block text-sm font-medium text-gray-300"
                    >
                        Description
                    </label>

                    <textarea
                        id="description"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your task..."
                        className="w-full resize-none rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="priority"
                            className="mb-2 block text-sm font-medium text-gray-300"
                        >
                            Priority
                        </label>

                        <select
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="">Select priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="status"
                            className="mb-2 block text-sm font-medium text-gray-300"
                        >
                            Status
                        </label>

                        <select
                            id="status"
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value as Task["status"])
                            }
                            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="todo">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="dueDate"
                        className="mb-2 block text-sm font-medium text-gray-300"
                    >
                        Due Date
                    </label>

                    <input
                        id="dueDate"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-500 shadow-sm"
                    >
                        {initialTask ? "Update Task" : "Create Task"}
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-lg border border-gray-700 bg-gray-800 px-5 py-2.5 font-medium text-gray-300 hover:bg-gray-750 hover:text-white transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}