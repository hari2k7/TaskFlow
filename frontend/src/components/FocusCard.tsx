"use client";
import { useState, useEffect } from "react";

interface FocusCardProps {
    title: string;
    duration: number;
}

export default function FocusCard({ title, duration }: FocusCardProps) {
    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(duration * 60);
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    useEffect(() => {
        if (!isRunning) {
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setIsRunning(false);
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning]);

    function handleReset() {
        setIsRunning(false);
        setTimeLeft(duration * 60)
    }

    return (
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-sm text-white">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <span className="text-xs font-medium text-blue-400 bg-blue-950/60 border border-blue-800/40 px-2.5 py-1 rounded-full">
                    {duration} min session
                </span>
            </div>

            <p className="mt-6 text-center font-mono text-5xl font-bold tracking-wider text-blue-400">
                {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                    className={`rounded-lg py-2.5 px-4 font-medium text-white transition shadow-sm ${
                        isRunning
                            ? "bg-amber-600 hover:bg-amber-500"
                            : "bg-blue-600 hover:bg-blue-500"
                    }`}
                    onClick={() => setIsRunning(!isRunning)}
                >
                    {isRunning ? "⏸ Pause" : "▶ Start Focus"}
                </button>
                <button
                    className="rounded-lg border border-gray-700 bg-gray-800 py-2.5 px-4 font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition"
                    onClick={handleReset}
                >
                    ↻ Reset
                </button>
            </div>
        </div>
    );
}