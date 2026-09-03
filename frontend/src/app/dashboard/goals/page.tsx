"use client";

import { useState, useEffect } from "react";
import GoalCard from "@/src/components/GoalCard";

interface Goal {
    id: string;
    title: string;
    current: number;
    target: number;
    category: string;
}

const initialGoals: Goal[] = [
    {
        id: "goal-1",
        title: "Complete Project MVP",
        current: 7,
        target: 10,
        category: "Work",
    },
    {
        id: "goal-2",
        title: "Learn TypeScript & App Router",
        current: 9,
        target: 12,
        category: "Learning",
    },
    {
        id: "goal-3",
        title: "Read 4 Productivity Books",
        current: 2,
        target: 4,
        category: "Personal",
    },
    {
        id: "goal-4",
        title: "Exercise 20 Days",
        current: 15,
        target: 20,
        category: "Health",
    },
];

export default function GoalsPage() {
    const [goals, setGoals] = useState<Goal[]>(initialGoals);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [target, setTarget] = useState("10");
    const [category, setCategory] = useState("Work");

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [showModal]);

    const completedGoalsCount = goals.filter((g) => g.current >= g.target).length;
    const inProgressCount = goals.length - completedGoalsCount;

    function handleCreateGoal(e: React.FormEvent) {
        e.preventDefault();
        if (!title.trim()) return;

        const targetNum = parseInt(target, 10) || 1;
        const newGoal: Goal = {
            id: `goal-${Date.now()}`,
            title: title.trim(),
            current: 0,
            target: targetNum,
            category,
        };

        setGoals((prev) => [newGoal, ...prev]);
        setTitle("");
        setTarget("10");
        setShowModal(false);
    }

    function handleIncrement(id: string) {
        setGoals((prev) =>
            prev.map((goal) => {
                if (goal.id === id && goal.current < goal.target) {
                    return { ...goal, current: goal.current + 1 };
                }
                return goal;
            })
        );
    }

    function handleDelete(id: string) {
        setGoals((prev) => prev.filter((goal) => goal.id !== id));
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Goals
                    </h1>
                    <p className="mt-1 text-gray-400">
                        Set milestones, track incremental progress, and celebrate achievements.
                    </p>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white shadow-sm transition hover:bg-blue-500"
                >
                    + Create Goal
                </button>
            </div>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                    <p className="text-xs font-medium text-gray-400">Total Active Goals</p>
                    <p className="mt-1 text-2xl font-bold text-white">{goals.length}</p>
                </div>
                <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                    <p className="text-xs font-medium text-blue-400">In Progress</p>
                    <p className="mt-1 text-2xl font-bold text-white">{inProgressCount}</p>
                </div>
                <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                    <p className="text-xs font-medium text-green-400">Completed</p>
                    <p className="mt-1 text-2xl font-bold text-white">{completedGoalsCount}</p>
                </div>
            </div>

            {/* Create Goal Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-xl">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-white">Create New Goal</h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleCreateGoal} className="mt-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300">
                                    Goal Title
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Read 5 Books"
                                    className="mt-1.5 w-full rounded-lg border border-gray-700 bg-gray-800 px-3.5 py-2.5 text-white placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300">
                                        Target Count
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        required
                                        value={target}
                                        onChange={(e) => setTarget(e.target.value)}
                                        className="mt-1.5 w-full rounded-lg border border-gray-700 bg-gray-800 px-3.5 py-2.5 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300">
                                        Category
                                    </label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="mt-1.5 w-full rounded-lg border border-gray-700 bg-gray-800 px-3.5 py-2.5 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    >
                                        <option value="Work">Work</option>
                                        <option value="Learning">Learning</option>
                                        <option value="Personal">Personal</option>
                                        <option value="Health">Health</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-500 transition"
                                >
                                    Add Goal
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 font-medium text-gray-300 hover:bg-gray-750 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Goals Grid */}
            <section>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {goals.map((goal) => (
                        <GoalCard
                            key={goal.id}
                            title={goal.title}
                            current={goal.current}
                            target={goal.target}
                            category={goal.category}
                            onIncrement={() => handleIncrement(goal.id)}
                            onDelete={() => handleDelete(goal.id)}
                        />
                    ))}
                </div>

                {goals.length === 0 && (
                    <div className="rounded-xl border border-dashed border-gray-800 p-12 text-center">
                        <p className="text-gray-400">No goals currently defined.</p>
                        <button
                            onClick={() => setShowModal(true)}
                            className="mt-3 text-sm font-medium text-blue-400 hover:text-blue-300"
                        >
                            + Create your first goal
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}
