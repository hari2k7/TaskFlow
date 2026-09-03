"use client";

import { useState } from "react";
import TaskForm from "@/src/components/TaskForm";
import TaskCard from "@/src/components/TaskCard";
import { Task } from "@/src/types/task";

export default function TasksPage() {
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const [tasks, setTasks] = useState<Task[]>([]);

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
                    <h1 className="text-3xl font-bold text-gray-900">
                        My Tasks
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Manage your tasks and stay productive.
                    </p>
                </div>

                <button
                    onClick={() => {
                        setEditingTask(null);
                        setShowForm(true);
                    }}
                    className="rounded-lg bg-gray-900 px-4 py-2.5 font-medium text-white hover:bg-gray-800"
                >
                    + Create Task
                </button>
            </div>

            {showForm && (
                <div className="mt-8">
                    <TaskForm
                        initialTask={editingTask ?? undefined}
                        onTaskCreated={handleTaskCreated}
                        onCancel={handleCancel}
                    />
                </div>
            )}

            <section className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900">
                    Your Tasks
                </h2>

                {tasks.length === 0 ? (
                    <p className="mt-4 text-gray-500">
                        No tasks yet. Create your first task!
                    </p>
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