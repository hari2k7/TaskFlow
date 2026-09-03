"use client";

import { useState, useEffect } from "react";

type TimerMode = "pomodoro" | "shortBreak" | "longBreak";

interface ModeConfig {
    label: string;
    durationMinutes: number;
    color: string;
}

const MODE_CONFIGS: Record<TimerMode, ModeConfig> = {
    pomodoro: { label: "Focus Session", durationMinutes: 25, color: "blue" },
    shortBreak: { label: "Short Break", durationMinutes: 5, color: "green" },
    longBreak: { label: "Long Break", durationMinutes: 15, color: "purple" },
};

export default function FocusPage() {
    const [mode, setMode] = useState<TimerMode>("pomodoro");
    const [timeLeft, setTimeLeft] = useState<number>(MODE_CONFIGS.pomodoro.durationMinutes * 60);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [sessionsCompleted, setSessionsCompleted] = useState<number>(3);
    const [taskFocusName, setTaskFocusName] = useState<string>("Learn Next.js App Router");

    // Switch timer mode
    function handleModeChange(newMode: TimerMode) {
        setIsRunning(false);
        setMode(newMode);
        setTimeLeft(MODE_CONFIGS[newMode].durationMinutes * 60);
    }

    // Timer countdown effect
    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setIsRunning(false);
                    if (mode === "pomodoro") {
                        setSessionsCompleted((s) => s + 1);
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, mode]);

    function handleReset() {
        setIsRunning(false);
        setTimeLeft(MODE_CONFIGS[mode].durationMinutes * 60);
    }

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const currentDuration = MODE_CONFIGS[mode].durationMinutes * 60;
    const progressPercent = Math.round(((currentDuration - timeLeft) / currentDuration) * 100);

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">
                    Focus / Pomodoro
                </h1>
                <p className="mt-1 text-gray-400">
                    Eliminate distractions with interval-based focus sprints and restorative breaks.
                </p>
            </div>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                    <span className="text-xs font-medium text-gray-400">Sessions Completed Today</span>
                    <p className="mt-1 text-2xl font-bold text-white">
                        {sessionsCompleted} <span className="text-sm font-normal text-gray-400">/ 8</span>
                    </p>
                </div>

                <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                    <span className="text-xs font-medium text-blue-400">Total Focus Time</span>
                    <p className="mt-1 text-2xl font-bold text-white">
                        {sessionsCompleted * 25} <span className="text-sm font-normal text-gray-400">mins</span>
                    </p>
                </div>

                <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                    <span className="text-xs font-medium text-amber-400">Focus Streak</span>
                    <p className="mt-1 text-2xl font-bold text-white">
                        🔥 4 <span className="text-sm font-normal text-gray-400">days</span>
                    </p>
                </div>
            </div>

            {/* Main Pomodoro Clock Card */}
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-lg text-center">
                {/* Mode Selector Tabs */}
                <div className="inline-flex rounded-xl bg-gray-950/80 p-1 border border-gray-800">
                    <button
                        onClick={() => handleModeChange("pomodoro")}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                            mode === "pomodoro"
                                ? "bg-blue-600 text-white shadow-sm"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        🎯 Pomodoro (25m)
                    </button>
                    <button
                        onClick={() => handleModeChange("shortBreak")}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                            mode === "shortBreak"
                                ? "bg-green-600 text-white shadow-sm"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        ☕ Short Break (5m)
                    </button>
                    <button
                        onClick={() => handleModeChange("longBreak")}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                            mode === "longBreak"
                                ? "bg-purple-600 text-white shadow-sm"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        🌴 Long Break (15m)
                    </button>
                </div>

                {/* Focus Task Name input */}
                <div className="mt-6 max-w-sm mx-auto">
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                        Currently Focusing On
                    </label>
                    <input
                        type="text"
                        value={taskFocusName}
                        onChange={(e) => setTaskFocusName(e.target.value)}
                        placeholder="What are you working on?"
                        className="w-full text-center rounded-lg border border-gray-700 bg-gray-950/60 px-3 py-1.5 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500"
                    />
                </div>

                {/* Big Timer Display */}
                <div className="my-8">
                    <span className="font-mono text-7xl md:text-8xl font-black tracking-wider text-blue-400">
                        {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
                    </span>
                    <p className="mt-2 text-sm font-medium text-gray-400">
                        {MODE_CONFIGS[mode].label} • {progressPercent}% elapsed
                    </p>
                </div>

                {/* Progress bar */}
                <div className="mx-auto max-w-md h-2 w-full rounded-full bg-gray-800 overflow-hidden mb-8">
                    <div
                        className="h-full bg-blue-500 transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={() => setIsRunning(!isRunning)}
                        className={`w-40 rounded-xl py-3 px-6 font-semibold text-white shadow-md transition ${
                            isRunning
                                ? "bg-amber-600 hover:bg-amber-500"
                                : "bg-blue-600 hover:bg-blue-500"
                        }`}
                    >
                        {isRunning ? "⏸ Pause" : "▶ Start Focus"}
                    </button>

                    <button
                        onClick={handleReset}
                        className="rounded-xl border border-gray-700 bg-gray-800 py-3 px-6 font-medium text-gray-300 hover:bg-gray-750 hover:text-white transition"
                    >
                        ↻ Reset
                    </button>
                </div>
            </div>

            {/* Daily Sessions Log */}
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-white">Today's Focus Log</h2>
                <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-950/50 border border-gray-800 text-sm">
                        <div className="flex items-center gap-3">
                            <span className="text-green-400">✓</span>
                            <span className="font-medium text-white">Learn TypeScript Basics</span>
                        </div>
                        <span className="text-xs text-gray-400">25 mins • 09:30 AM</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-950/50 border border-gray-800 text-sm">
                        <div className="flex items-center gap-3">
                            <span className="text-green-400">✓</span>
                            <span className="font-medium text-white">Design Dashboard Layout</span>
                        </div>
                        <span className="text-xs text-gray-400">25 mins • 11:00 AM</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-950/50 border border-gray-800 text-sm">
                        <div className="flex items-center gap-3">
                            <span className="text-green-400">✓</span>
                            <span className="font-medium text-white">Configure Dark Mode Palette</span>
                        </div>
                        <span className="text-xs text-gray-400">25 mins • 02:15 PM</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
