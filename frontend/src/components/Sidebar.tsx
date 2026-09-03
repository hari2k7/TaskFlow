"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/dashboard/tasks", label: "My Tasks", icon: "✓" },
    { href: "/dashboard/goals", label: "Goals", icon: "🎯" },
    { href: "/dashboard/habits", label: "Habits", icon: "🔥" },
    { href: "/dashboard/calendar", label: "Calendar", icon: "📅" },
    { href: "/dashboard/focus", label: "Focus / Pomodoro", icon: "⏱️" },
    { href: "/dashboard/notes", label: "Notes", icon: "📝" },
    { href: "/dashboard/workspace", label: "Workspace", icon: "👥" },
    { href: "/dashboard/analytics", label: "Analytics", icon: "📈" },
    { href: "/dashboard/settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-gray-800 bg-gray-900 p-5 text-white z-40">
            <div className="flex items-center justify-between px-2">
                <Link href="/dashboard" className="text-2xl font-bold tracking-tight text-white hover:text-blue-400 transition">
                    TaskFlow
                </Link>
                <span className="rounded-full bg-blue-900/60 border border-blue-700/50 px-2 py-0.5 text-[10px] font-medium text-blue-300">
                    Pro
                </span>
            </div>

            <nav className="mt-6 flex flex-1 flex-col gap-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                                isActive
                                    ? "bg-blue-600 text-white font-medium shadow-sm"
                                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                            }`}
                        >
                            <span className="text-base">{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-4 border-t border-gray-800">
                {/* Light Mode Placeholder Toggle */}
                <div className="mb-4 flex items-center justify-between rounded-lg bg-gray-950/60 p-2.5 border border-gray-800">
                    <span className="text-xs text-gray-400">Theme</span>
                    <button
                        type="button"
                        aria-label="Toggle theme placeholder"
                        title="Theme switching functionality will be implemented soon"
                        className="flex items-center gap-1.5 rounded-md bg-gray-800 px-2.5 py-1 text-xs font-medium text-gray-300 hover:bg-gray-700 transition"
                    >
                        <span>🌙 Dark</span>
                        <span className="text-gray-500">|</span>
                        <span className="text-gray-400 hover:text-white">☀️</span>
                    </button>
                </div>

                <div className="flex items-center gap-3 px-1">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-semibold text-white text-sm">
                        TF
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-xs text-gray-400">Signed in as</p>
                        <p className="truncate text-sm font-medium text-white">UserName</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}