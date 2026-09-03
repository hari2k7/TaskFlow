"use client";

import { useState } from "react";

interface CalendarEvent {
    id: string;
    day: number;
    title: string;
    type: "task" | "event" | "deadline";
    time?: string;
    priority?: "high" | "medium" | "low";
}

const staticEvents: CalendarEvent[] = [
    { id: "e1", day: 5, title: "Learn TypeScript", type: "task", time: "10:00 AM", priority: "high" },
    { id: "e2", day: 7, title: "Learn Next.js", type: "task", time: "02:00 PM", priority: "medium" },
    { id: "e3", day: 12, title: "Product Strategy Review", type: "event", time: "11:30 AM" },
    { id: "e4", day: 15, title: "Build TaskFlow MVP", type: "deadline", time: "05:00 PM", priority: "high" },
    { id: "e5", day: 18, title: "Sprint Retro & Demo", type: "event", time: "03:00 PM" },
    { id: "e6", day: 22, title: "Deploy Go Backend", type: "task", time: "01:00 PM", priority: "high" },
    { id: "e7", day: 26, title: "User Feedback Session", type: "event", time: "04:30 PM" },
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CalendarPage() {
    const [selectedDay, setSelectedDay] = useState<number>(15);
    const [monthOffset, setMonthOffset] = useState<number>(0);

    // Representing September 2026 (starts on Tuesday = 1 leading empty day for Monday start)
    const monthNames = ["September 2026", "October 2026", "November 2026"];
    const currentMonthName = monthNames[Math.min(Math.max(monthOffset, 0), monthNames.length - 1)] || "September 2026";
    const totalDays = 30;
    const startPadding = 1; // 1 blank day (Tue start)

    const dayCells = Array.from({ length: totalDays }, (_, i) => i + 1);
    const paddingCells = Array.from({ length: startPadding }, (_, i) => i);

    const selectedEvents = staticEvents.filter((ev) => ev.day === selectedDay);

    function getTypeBadge(type: CalendarEvent["type"]) {
        if (type === "deadline") return "bg-red-950/70 text-red-400 border border-red-800/50";
        if (type === "event") return "bg-purple-950/70 text-purple-400 border border-purple-800/50";
        return "bg-blue-950/70 text-blue-400 border border-blue-800/50";
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Calendar
                    </h1>
                    <p className="mt-1 text-gray-400">
                        View scheduled tasks, deadlines, and team events for the month.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setMonthOffset((prev) => Math.max(prev - 1, 0))}
                        className="rounded-lg border border-gray-800 bg-gray-900 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition"
                    >
                        ← Prev
                    </button>
                    <span className="min-w-36 text-center font-medium text-white text-sm">
                        {currentMonthName}
                    </span>
                    <button
                        onClick={() => setMonthOffset((prev) => Math.min(prev + 1, 2))}
                        className="rounded-lg border border-gray-800 bg-gray-900 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition"
                    >
                        Next →
                    </button>
                </div>
            </div>

            {/* Layout: Calendar Grid + Selected Day Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Calendar Grid */}
                <div className="lg:col-span-2 rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
                    {/* Day labels */}
                    <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-gray-400 pb-3 border-b border-gray-800">
                        {daysOfWeek.map((d) => (
                            <div key={d}>{d}</div>
                        ))}
                    </div>

                    {/* Day tiles */}
                    <div className="mt-3 grid grid-cols-7 gap-2">
                        {paddingCells.map((p) => (
                            <div key={`pad-${p}`} className="h-20 rounded-lg bg-gray-950/30 p-2 opacity-30" />
                        ))}

                        {dayCells.map((day) => {
                            const dayEvents = staticEvents.filter((e) => e.day === day);
                            const isSelected = selectedDay === day;
                            const isToday = day === 15;

                            return (
                                <button
                                    key={day}
                                    type="button"
                                    onClick={() => setSelectedDay(day)}
                                    className={`h-20 rounded-lg p-2 text-left transition flex flex-col justify-between border ${
                                        isSelected
                                            ? "border-blue-500 bg-blue-950/30 ring-1 ring-blue-500/50"
                                            : "border-gray-800/80 bg-gray-950/60 hover:border-gray-700 hover:bg-gray-800/50"
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span
                                            className={`text-xs font-semibold ${
                                                isToday
                                                    ? "flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white"
                                                    : "text-gray-300"
                                            }`}
                                        >
                                            {day}
                                        </span>
                                        {dayEvents.length > 0 && (
                                            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                                        )}
                                    </div>

                                    <div className="mt-1 flex flex-col gap-1 overflow-hidden">
                                        {dayEvents.slice(0, 2).map((ev) => (
                                            <div
                                                key={ev.id}
                                                className="truncate text-[10px] px-1.5 py-0.5 rounded bg-gray-800/90 text-gray-200"
                                            >
                                                {ev.title}
                                            </div>
                                        ))}
                                        {dayEvents.length > 2 && (
                                            <span className="text-[9px] text-gray-500">
                                                +{dayEvents.length - 2} more
                                            </span>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Day Agenda Panel */}
                <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-sm flex flex-col">
                    <div className="border-b border-gray-800 pb-4">
                        <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">
                            Selected Day
                        </span>
                        <h2 className="mt-1 text-xl font-bold text-white">
                            September {selectedDay}, 2026
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                            {selectedEvents.length} scheduled item{selectedEvents.length === 1 ? "" : "s"}
                        </p>
                    </div>

                    <div className="mt-6 flex-1 space-y-3 overflow-y-auto">
                        {selectedEvents.length === 0 ? (
                            <div className="py-12 text-center text-gray-500">
                                <p className="text-sm">No tasks or events on this date.</p>
                                <p className="text-xs text-gray-600 mt-1">Select another day or add an entry.</p>
                            </div>
                        ) : (
                            selectedEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="rounded-lg border border-gray-800 bg-gray-950/60 p-4 transition hover:border-gray-700"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="text-sm font-semibold text-white">
                                            {event.title}
                                        </h3>
                                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${getTypeBadge(event.type)}`}>
                                            {event.type}
                                        </span>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                                        <span>⏰ {event.time || "All day"}</span>
                                        {event.priority && (
                                            <span className="capitalize text-gray-300">
                                                Priority: {event.priority}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-800">
                        <button
                            type="button"
                            className="w-full rounded-lg bg-gray-800 py-2.5 px-4 text-xs font-medium text-gray-200 hover:bg-gray-750 hover:text-white transition"
                        >
                            + Schedule Event for Sep {selectedDay}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
