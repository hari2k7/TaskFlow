"use client";

import { useState } from "react";

export default function SettingsPage() {
    const [name, setName] = useState("UserName");
    const [email, setEmail] = useState("user@taskflow.dev");
    const [role, setRole] = useState("Full Stack Developer");

    // Notification preferences state (frontend UI only)
    const [taskReminders, setTaskReminders] = useState(true);
    const [dailySummary, setDailySummary] = useState(true);
    const [soundEffects, setSoundEffects] = useState(true);
    const [savedNotice, setSavedNotice] = useState(false);

    function handleSave(e: React.FormEvent) {
        e.preventDefault();
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
    }

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">
                    Settings
                </h1>
                <p className="mt-1 text-gray-400">
                    Manage your personal profile, theme preferences, and notification rules.
                </p>
            </div>

            {savedNotice && (
                <div className="rounded-xl border border-green-800 bg-green-950/60 p-4 text-sm font-medium text-green-300">
                    ✓ Settings saved successfully (frontend state updated).
                </div>
            )}

            {/* Section 1: Appearance & Theme (With requested Light Mode placeholder) */}
            <section className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                    <div>
                        <h2 className="text-lg font-semibold text-white">Appearance & Theme</h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                            Customize the color scheme of your TaskFlow interface.
                        </p>
                    </div>
                    <span className="rounded-full bg-blue-950/80 border border-blue-800/60 px-2.5 py-0.5 text-xs font-medium text-blue-400">
                        Default: Dark Mode
                    </span>
                </div>

                <div className="mt-6 space-y-4">
                    <p className="text-sm font-medium text-gray-300">Theme Mode</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Dark Mode Option (Active) */}
                        <div className="relative rounded-xl border-2 border-blue-500 bg-gray-950 p-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 font-medium text-white text-sm">
                                    <span>🌙</span> Dark Mode
                                </span>
                                <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                                    Active
                                </span>
                            </div>
                            <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                                Primary TaskFlow aesthetic with low-glare dark backgrounds and sharp contrast.
                            </p>
                        </div>

                        {/* Light Mode Placeholder Option (Requested) */}
                        <div className="relative rounded-xl border border-gray-800 bg-gray-950/60 p-4 opacity-75 transition hover:opacity-100">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 font-medium text-gray-300 text-sm">
                                    <span>☀️</span> Light Mode
                                </span>
                                <span className="rounded-full bg-gray-800 border border-gray-700 px-2 py-0.5 text-[10px] font-medium text-gray-400">
                                    Coming Soon
                                </span>
                            </div>
                            <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                                Visual placeholder toggle. Theme switching functionality will be implemented in a future iteration.
                            </p>
                            <button
                                type="button"
                                title="Theme switching functionality will be implemented later"
                                className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-gray-700 bg-gray-800 px-3 py-1 text-xs font-medium text-gray-300 hover:bg-gray-750 transition"
                            >
                                <span>Preview Light Toggle</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Profile Settings */}
            <form onSubmit={handleSave} className="space-y-6">
                <section className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
                    <div className="border-b border-gray-800 pb-4">
                        <h2 className="text-lg font-semibold text-white">Profile Information</h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                            Update your personal details displayed across your workspace.
                        </p>
                    </div>

                    <div className="mt-6 space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 font-bold text-white text-xl">
                                TF
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="rounded-lg border border-gray-700 bg-gray-800 px-3.5 py-1.5 text-xs font-medium text-gray-200 hover:bg-gray-750 transition"
                                >
                                    Change Avatar
                                </button>
                                <p className="mt-1 text-[11px] text-gray-500">JPG, PNG or GIF up to 2MB</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-300">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1.5 w-full rounded-lg border border-gray-700 bg-gray-800 px-3.5 py-2 text-sm text-white outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1.5 w-full rounded-lg border border-gray-700 bg-gray-800 px-3.5 py-2 text-sm text-white outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">
                                Role / Title
                            </label>
                            <input
                                type="text"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="mt-1.5 w-full rounded-lg border border-gray-700 bg-gray-800 px-3.5 py-2 text-sm text-white outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>
                </section>

                {/* Section 3: Notification Preferences */}
                <section className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
                    <div className="border-b border-gray-800 pb-4">
                        <h2 className="text-lg font-semibold text-white">Notifications & Alerts</h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                            Configure how and when TaskFlow notifies you of upcoming deadlines.
                        </p>
                    </div>

                    <div className="mt-6 space-y-4">
                        <label className="flex items-center justify-between p-3 rounded-lg bg-gray-950/40 border border-gray-800 cursor-pointer">
                            <div>
                                <p className="text-sm font-medium text-white">Task Due Date Reminders</p>
                                <p className="text-xs text-gray-400">Receive alerts 30 minutes before deadlines</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={taskReminders}
                                onChange={(e) => setTaskReminders(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-0"
                            />
                        </label>

                        <label className="flex items-center justify-between p-3 rounded-lg bg-gray-950/40 border border-gray-800 cursor-pointer">
                            <div>
                                <p className="text-sm font-medium text-white">Daily Productivity Summary</p>
                                <p className="text-xs text-gray-400">Get an overview of tasks and habits each morning</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={dailySummary}
                                onChange={(e) => setDailySummary(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-0"
                            />
                        </label>

                        <label className="flex items-center justify-between p-3 rounded-lg bg-gray-950/40 border border-gray-800 cursor-pointer">
                            <div>
                                <p className="text-sm font-medium text-white">Focus Timer Sound Alerts</p>
                                <p className="text-xs text-gray-400">Play a chime when a Pomodoro session completes</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={soundEffects}
                                onChange={(e) => setSoundEffects(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-0"
                            />
                        </label>
                    </div>
                </section>

                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white shadow-sm hover:bg-blue-500 transition"
                    >
                        Save Preferences
                    </button>
                </div>
            </form>
        </div>
    );
}
