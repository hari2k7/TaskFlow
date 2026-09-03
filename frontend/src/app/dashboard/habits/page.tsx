"use client";

import { useState, useEffect } from "react";
import HabitCard from "@/src/components/HabitCard";

interface HabitItem {
    id: string;
    title: string;
    streak: number;
    icon: string;
    completedToday: boolean;
    frequency: string;
    weekHistory: boolean[]; // Mon to Sun
}

const initialHabits: HabitItem[] = [
    {
        id: "habit-1",
        title: "Drink 2.5L Water",
        streak: 6,
        icon: "💧",
        completedToday: true,
        frequency: "Daily",
        weekHistory: [true, true, true, true, true, true, false],
    },
    {
        id: "habit-2",
        title: "Morning Exercise & Stretch",
        streak: 8,
        icon: "🏃",
        completedToday: true,
        frequency: "Daily",
        weekHistory: [true, true, true, true, true, true, true],
    },
    {
        id: "habit-3",
        title: "Read 30 Minutes",
        streak: 4,
        icon: "📚",
        completedToday: false,
        frequency: "Daily",
        weekHistory: [true, false, true, true, true, false, false],
    },
    {
        id: "habit-4",
        title: "Deep Work Sprint (60m)",
        streak: 12,
        icon: "⚡",
        completedToday: false,
        frequency: "Weekdays",
        weekHistory: [true, true, true, true, true, false, false],
    },
    {
        id: "habit-5",
        title: "Code Review & Learn Go",
        streak: 5,
        icon: "💻",
        completedToday: true,
        frequency: "Daily",
        weekHistory: [true, true, true, true, true, false, false],
    },
];

const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];

export default function HabitsPage() {
    const [habits, setHabits] = useState<HabitItem[]>(initialHabits);
    const [showModal, setShowModal] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newIcon, setNewIcon] = useState("🎯");

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

    const totalHabits = habits.length;
    const completedCount = habits.filter((h) => h.completedToday).length;
    const completionRate = totalHabits > 0 ? Math.round((completedCount / totalHabits) * 100) : 0;
    const maxStreak = habits.reduce((max, h) => Math.max(max, h.streak), 0);

    function handleToggleHabit(id: string) {
        setHabits((prev) =>
            prev.map((habit) => {
                if (habit.id === id) {
                    const newStatus = !habit.completedToday;
                    return {
                        ...habit,
                        completedToday: newStatus,
                        streak: newStatus ? habit.streak + 1 : Math.max(0, habit.streak - 1),
                    };
                }
                return habit;
            })
        );
    }

    function handleDeleteHabit(id: string) {
        setHabits((prev) => prev.filter((h) => h.id !== id));
    }

    function handleAddHabit(e: React.FormEvent) {
        e.preventDefault();
        if (!newTitle.trim()) return;

        const newHabit: HabitItem = {
            id: `habit-${Date.now()}`,
            title: newTitle.trim(),
            streak: 0,
            icon: newIcon || "✨",
            completedToday: false,
            frequency: "Daily",
            weekHistory: [false, false, false, false, false, false, false],
        };

        setHabits((prev) => [newHabit, ...prev]);
        setNewTitle("");
        setShowModal(false);
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Habits
                    </h1>
                    <p className="mt-1 text-gray-400">
                        Build routines, track consistency, and maintain unstoppable streaks.
                    </p>
                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white shadow-sm transition hover:bg-blue-500"
                >
                    + New Habit
                </button>
            </div>

            {/* Habit Stats Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                    <p className="text-xs font-medium text-gray-400">Habits Tracked</p>
                    <p className="mt-1 text-2xl font-bold text-white">{totalHabits}</p>
                </div>

                <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                    <p className="text-xs font-medium text-green-400">Completed Today</p>
                    <p className="mt-1 text-2xl font-bold text-white">
                        {completedCount} <span className="text-sm font-normal text-gray-400">/ {totalHabits}</span>
                    </p>
                </div>

                <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                    <p className="text-xs font-medium text-blue-400">Today's Rate</p>
                    <p className="mt-1 text-2xl font-bold text-white">{completionRate}%</p>
                </div>

                <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                    <p className="text-xs font-medium text-amber-400">Best Streak</p>
                    <p className="mt-1 text-2xl font-bold text-white">🔥 {maxStreak} days</p>
                </div>
            </div>

            {/* Habits List */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">Today's Checklist</h2>
                    <span className="text-xs text-gray-400">Click checkmark to toggle completed</span>
                </div>

                <div className="flex flex-col gap-3">
                    {habits.map((habit) => (
                        <HabitCard
                            key={habit.id}
                            title={habit.title}
                            streak={habit.streak}
                            icon={habit.icon}
                            completedToday={habit.completedToday}
                            onToggle={() => handleToggleHabit(habit.id)}
                            onDelete={() => handleDeleteHabit(habit.id)}
                        />
                    ))}
                </div>
            </section>

            {/* Weekly Consistency Tracker */}
            <section className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-white mb-1">Weekly Consistency</h2>
                <p className="text-xs text-gray-400 mb-6">Historical activity across the past 7 days</p>

                <div className="space-y-4">
                    {habits.map((habit) => (
                        <div
                            key={`tracker-${habit.id}`}
                            className="flex items-center justify-between gap-4 p-3 rounded-lg bg-gray-950/40 border border-gray-800/80"
                        >
                            <div className="flex items-center gap-2 truncate min-w-40">
                                <span className="text-base">{habit.icon}</span>
                                <span className="text-sm font-medium text-white truncate">{habit.title}</span>
                            </div>

                            {/* Day indicators Mon - Sun */}
                            <div className="flex items-center gap-2">
                                {habit.weekHistory.map((done, idx) => (
                                    <div key={idx} className="flex flex-col items-center gap-1">
                                        <span className="text-[10px] text-gray-500 font-medium">{dayLabels[idx]}</span>
                                        <div
                                            className={`h-6 w-6 rounded-md flex items-center justify-center text-[10px] ${
                                                done
                                                    ? "bg-green-600/80 text-white font-bold"
                                                    : "bg-gray-800 text-gray-600"
                                            }`}
                                        >
                                            {done ? "✓" : "·"}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Add Habit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-xl">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-white">Create Habit</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleAddHabit} className="mt-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Habit Name</label>
                                <input
                                    type="text"
                                    required
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    placeholder="e.g. Meditate for 10 minutes"
                                    className="mt-1.5 w-full rounded-lg border border-gray-700 bg-gray-800 px-3.5 py-2.5 text-white placeholder-gray-500 outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300">Icon / Emoji</label>
                                <div className="mt-1.5 flex gap-2">
                                    {["💧", "🏃", "📚", "⚡", "🧘", "🥗", "💻", "🎯"].map((emoji) => (
                                        <button
                                            key={emoji}
                                            type="button"
                                            onClick={() => setNewIcon(emoji)}
                                            className={`h-10 w-10 rounded-lg text-lg flex items-center justify-center border transition ${
                                                newIcon === emoji
                                                    ? "border-blue-500 bg-blue-950/60"
                                                    : "border-gray-700 bg-gray-800 hover:border-gray-600"
                                            }`}
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-500 transition"
                                >
                                    Save Habit
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
        </div>
    );
}
