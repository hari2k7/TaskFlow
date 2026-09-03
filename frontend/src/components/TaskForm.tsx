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
        <div className="w-full max-w-2xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
                {initialTask ? "Edit Task" : "Create Task"}
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor="title"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Title
                    </label>

                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter task title"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                    />
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Description
                    </label>

                    <textarea
                        id="description"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your task..."
                        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="priority"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Priority
                        </label>

                        <select
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
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
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Status
                        </label>

                        <select
                            id="status"
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value as Task["status"])
                            }
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
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
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Due Date
                    </label>

                    <input
                        id="dueDate"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-gray-900 px-4 py-2.5 font-medium text-white transition hover:bg-gray-800"
                >
                    {initialTask ? "Update Task" : "Create Task"}
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}