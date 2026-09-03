"use client";

import { useState, useEffect } from "react";
import TaskForm from "@/src/components/TaskForm";
import TaskCard from "@/src/components/TaskCard";
import { Task } from "@/src/types/task";

export default function TasksPage() {
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        if (showForm) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [showForm]);

    function handleTaskCreated(task: {
        title: string;
        description: string;
        priority: string;
        status: string;
        dueDate: string;
    }) {
        if (editingTask) {
            setTasks((prevTasks) =>
                prevTasks.map((currentTask) =>
                    currentTask.id === editingTask.id
                        ? {
                              ...currentTask,
                              title: task.title,
                              description: task.description,
                              priority: task.priority as Task["priority"],
                              status: task.status as Task["status"],
                              dueDate: task.dueDate,
                          }
                        : currentTask
                )
            );

            setEditingTask(null);
            setShowForm(false);
            return;
        }

        const newTask: Task = {
            id: crypto.randomUUID(),
            title: task.title,
            description: task.description,
            priority: task.priority as Task["priority"],
            status: task.status as Task["status"],
            dueDate: task.dueDate,
        };

        setTasks((prevTasks) => [...prevTasks, newTask]);
        setShowForm(false);
    }

    function handleDeleteTask(id: string) {
        setTasks((prevTasks) =>
            prevTasks.filter((task) => task.id !== id)
        );
    }

    function handleEditTask(task: Task) {
        setEditingTask(task);
        setShowForm(true);
    }

    function handleCancel() {
        setEditingTask(null);
        setShowForm(false);
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        My Tasks
                    </h1>

                    <p className="mt-1 text-gray-400">
                        Manage your tasks and stay productive.
                    </p>
                </div>

                <button
                    onClick={() => {
                        setEditingTask(null);
                        setShowForm(true);
                    }}
                    className="rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white shadow-sm transition hover:bg-blue-500"
                >
                    + Create Task
                </button>
            </div>

            {/* Modal Overlay for Create / Edit Task */}
            {showForm && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm"
                    onClick={handleCancel}
                >
                    <div
                        className="relative w-full max-w-2xl my-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <TaskForm
                            initialTask={editingTask ?? undefined}
                            onTaskCreated={handleTaskCreated}
                            onCancel={handleCancel}
                        />
                    </div>
                </div>
            )}

            <section className="mt-8">
                <h2 className="text-xl font-semibold text-white">
                    Your Tasks
                </h2>

                {tasks.length === 0 ? (
                    <div className="mt-6 rounded-xl border border-dashed border-gray-800 p-8 text-center">
                        <p className="text-gray-400">
                            No tasks yet. Create your first task to get started!
                        </p>
                        <button
                            onClick={() => {
                                setEditingTask(null);
                                setShowForm(true);
                            }}
                            className="mt-4 rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-700 transition"
                        >
                            + Add Task
                        </button>
                    </div>
                ) : (
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {tasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onDelete={handleDeleteTask}
                                onEdit={handleEditTask}
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}