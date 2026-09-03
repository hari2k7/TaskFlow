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
        <div className="mt-4 rounded-lg border bg-white p-6 shadow-sm">
            <h2>{title}</h2>
            <p className="mt-6 text-center text-4xl font-bold">
                {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
            </p>
            <div className="grid grid-cols-2 gap-2">
                <button
                    className="mt-6 rounded-lg bg-blue-600 px-5 py-2 text-white"
                    onClick={() => setIsRunning(!isRunning)}
                >
                    {isRunning ? "⏸ Pause" : "▶ Start Focus"}
                </button>
                <button
                    className="mt-6 rounded-lg bg-blue-600 px-5 py-2 text-white"
                    onClick={handleReset}
                >
                    ↻ Reset
                </button>
            </div>
        </div>
    )
}