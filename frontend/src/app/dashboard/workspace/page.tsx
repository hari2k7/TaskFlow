"use client";

import { useState } from "react";

interface Member {
    id: string;
    name: string;
    role: string;
    email: string;
    status: "online" | "away" | "offline";
    avatarInitials: string;
}

interface Project {
    id: string;
    name: string;
    description: string;
    progress: number;
    tasksCount: number;
    teamCount: number;
    status: "in-progress" | "review" | "planning";
}

interface Activity {
    id: string;
    user: string;
    action: string;
    target: string;
    time: string;
}

const members: Member[] = [
    { id: "m1", name: "Hari", role: "Owner & Lead", email: "hari@taskflow.dev", status: "online", avatarInitials: "H" },
    { id: "m2", name: "Alex Chen", role: "Backend Engineer", email: "alex@taskflow.dev", status: "online", avatarInitials: "AC" },
    { id: "m3", name: "Sarah Connor", role: "Product Manager", email: "sarah@taskflow.dev", status: "away", avatarInitials: "SC" },
    { id: "m4", name: "David Miller", role: "DevOps Engineer", email: "david@taskflow.dev", status: "offline", avatarInitials: "DM" },
];

const projects: Project[] = [
    {
        id: "p1",
        name: "TaskFlow Next.js Frontend",
        description: "App router, dark mode aesthetic, dashboard & productivity modules.",
        progress: 85,
        tasksCount: 14,
        teamCount: 3,
        status: "in-progress",
    },
    {
        id: "p2",
        name: "Go + PostgreSQL Core API",
        description: "High-performance REST API backend with JWT auth and relational data store.",
        progress: 35,
        tasksCount: 8,
        teamCount: 2,
        status: "in-progress",
    },
    {
        id: "p3",
        name: "Mobile App Companion",
        description: "Cross-platform mobile client for offline habit and focus session tracking.",
        progress: 15,
        tasksCount: 6,
        teamCount: 2,
        status: "planning",
    },
];

const activities: Activity[] = [
    { id: "a1", user: "Hari", action: "completed", target: "Frontend Dark Mode Polish", time: "10 mins ago" },
    { id: "a2", user: "Alex Chen", action: "drafted", target: "PostgreSQL Database Schema", time: "1 hour ago" },
    { id: "a3", user: "Sarah Connor", action: "updated", target: "Q3 Sprint Milestone Goals", time: "3 hours ago" },
    { id: "a4", user: "David Miller", action: "created", target: "Docker compose environment", time: "Yesterday" },
];

export default function WorkspacePage() {
    const [activeTab, setActiveTab] = useState<"projects" | "members" | "activity">("projects");

    function getStatusDot(status: Member["status"]) {
        if (status === "online") return "bg-green-500";
        if (status === "away") return "bg-amber-500";
        return "bg-gray-500";
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold tracking-tight text-white">
                            Engineering Core
                        </h1>
                        <span className="rounded-full bg-blue-950/80 border border-blue-800/60 px-2.5 py-0.5 text-xs font-semibold text-blue-400">
                            Team Workspace
                        </span>
                    </div>
                    <p className="mt-1 text-gray-400">
                        Collaborative hub for active projects, teammates, and recent team progress.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 transition"
                    >
                        + New Project
                    </button>
                    <button
                        type="button"
                        className="rounded-lg border border-gray-800 bg-gray-900 px-3.5 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition"
                    >
                        Invite Member
                    </button>
                </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                    <p className="text-xs font-medium text-gray-400">Active Projects</p>
                    <p className="mt-1 text-2xl font-bold text-white">{projects.length}</p>
                </div>
                <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                    <p className="text-xs font-medium text-blue-400">Team Members</p>
                    <p className="mt-1 text-2xl font-bold text-white">{members.length}</p>
                </div>
                <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                    <p className="text-xs font-medium text-green-400">Online Now</p>
                    <p className="mt-1 text-2xl font-bold text-white">
                        {members.filter((m) => m.status === "online").length}
                    </p>
                </div>
            </div>

            {/* View Tabs */}
            <div className="flex gap-2 border-b border-gray-800 pb-2">
                <button
                    onClick={() => setActiveTab("projects")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                        activeTab === "projects"
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-gray-400 hover:text-white hover:bg-gray-900"
                    }`}
                >
                    Projects ({projects.length})
                </button>
                <button
                    onClick={() => setActiveTab("members")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                        activeTab === "members"
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-gray-400 hover:text-white hover:bg-gray-900"
                    }`}
                >
                    Members ({members.length})
                </button>
                <button
                    onClick={() => setActiveTab("activity")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                        activeTab === "activity"
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-gray-400 hover:text-white hover:bg-gray-900"
                    }`}
                >
                    Activity Feed
                </button>
            </div>

            {/* Tab 1: Projects Grid */}
            {activeTab === "projects" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {projects.map((proj) => (
                        <div
                            key={proj.id}
                            className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-sm transition hover:border-gray-700 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                                        {proj.status}
                                    </span>
                                    <span className="text-xs text-gray-500 font-mono">
                                        {proj.tasksCount} tasks
                                    </span>
                                </div>

                                <h3 className="mt-2 text-lg font-bold text-white">
                                    {proj.name}
                                </h3>
                                <p className="mt-1 text-sm text-gray-400 leading-relaxed">
                                    {proj.description}
                                </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-800/80">
                                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                                    <span>Completion</span>
                                    <span className="font-semibold text-white">{proj.progress}%</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-gray-800 overflow-hidden">
                                    <div
                                        className="h-full bg-blue-600 rounded-full"
                                        style={{ width: `${proj.progress}%` }}
                                    />
                                </div>

                                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                                    <span>👥 {proj.teamCount} contributors</span>
                                    <button className="text-blue-400 hover:text-blue-300 font-medium">
                                        View details →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Tab 2: Members Directory */}
            {activeTab === "members" && (
                <div className="rounded-xl border border-gray-800 bg-gray-900 overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                        <h2 className="font-semibold text-white">Workspace Directory</h2>
                        <span className="text-xs text-gray-400">{members.length} team members</span>
                    </div>

                    <div className="divide-y divide-gray-800">
                        {members.map((member) => (
                            <div key={member.id} className="flex items-center justify-between p-4 hover:bg-gray-850/40 transition">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                                            {member.avatarInitials}
                                        </div>
                                        <span
                                            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-gray-900 ${getStatusDot(
                                                member.status
                                            )}`}
                                        />
                                    </div>

                                    <div>
                                        <p className="font-medium text-white text-sm">{member.name}</p>
                                        <p className="text-xs text-gray-400">{member.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-medium text-gray-300 bg-gray-800 px-2.5 py-1 rounded-md">
                                        {member.role}
                                    </span>
                                    <span className="capitalize text-xs text-gray-500">
                                        {member.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tab 3: Recent Activity */}
            {activeTab === "activity" && (
                <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
                    <h2 className="font-semibold text-white mb-4">Activity Timeline</h2>
                    <div className="space-y-4">
                        {activities.map((act) => (
                            <div
                                key={act.id}
                                className="flex items-center justify-between p-3.5 rounded-lg bg-gray-950/40 border border-gray-800 text-sm"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-white">{act.user}</span>
                                    <span className="text-gray-400">{act.action}</span>
                                    <span className="font-medium text-blue-400">{act.target}</span>
                                </div>
                                <span className="text-xs text-gray-500">{act.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
