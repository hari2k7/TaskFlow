"use client";

import StatCard from "@/src/components/StatCard";
import ProductivityChart, { ProductivityDay } from "@/src/components/ProductivityChart";

const weeklyData: ProductivityDay[] = [
    { day: "Mon", value: 85 },
    { day: "Tue", value: 92 },
    { day: "Wed", value: 78 },
    { day: "Thu", value: 95 },
    { day: "Fri", value: 72 },
    { day: "Sat", value: 50 },
    { day: "Sun", value: 88 },
];

const categoryBreakdown = [
    { name: "Frontend Development", percentage: 45, count: 18, color: "bg-blue-600" },
    { name: "Backend & Database", percentage: 30, count: 12, color: "bg-indigo-600" },
    { name: "DevOps & Tooling", percentage: 15, count: 6, color: "bg-purple-600" },
    { name: "Planning & Architecture", percentage: 10, count: 4, color: "bg-emerald-600" },
];

const priorityDistribution = [
    { priority: "High", count: 14, percent: 35, badge: "bg-red-950/70 text-red-400 border border-red-800/40" },
    { priority: "Medium", count: 20, percent: 50, badge: "bg-amber-950/70 text-amber-400 border border-amber-800/40" },
    { priority: "Low", count: 6, percent: 15, badge: "bg-emerald-950/70 text-emerald-400 border border-emerald-800/40" },
];

export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">
                    Analytics & Insights
                </h1>
                <p className="mt-1 text-gray-400">
                    Comprehensive overview of your task throughput, focus time, and habit consistency.
                </p>
            </div>

            {/* Top StatCards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon="✓"
                    title="Tasks Completed"
                    value="42"
                    subtitle="This Month"
                />
                <StatCard
                    icon="⏱"
                    title="Focus Logged"
                    value="38h 20m"
                    subtitle="+12% vs last week"
                />
                <StatCard
                    icon="📈"
                    title="Habit Success Rate"
                    value="88%"
                    subtitle="High consistency"
                />
                <StatCard
                    icon="🔥"
                    title="Productivity Streak"
                    value="14 Days"
                    subtitle="Personal best"
                />
            </div>

            {/* Productivity Chart section */}
            <ProductivityChart
                data={weeklyData}
                title="Weekly Focus & Output Trend"
            />

            {/* Two-column insights: Category Breakdown & Priority Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Tasks by Category */}
                <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-white">Output by Domain</h2>
                    <p className="text-xs text-gray-400 mb-6">Distribution of completed tasks across work areas</p>

                    <div className="space-y-4">
                        {categoryBreakdown.map((cat) => (
                            <div key={cat.name}>
                                <div className="flex justify-between text-sm mb-1.5">
                                    <span className="text-gray-300 font-medium">{cat.name}</span>
                                    <span className="text-xs text-gray-400 font-mono">
                                        {cat.count} tasks ({cat.percentage}%)
                                    </span>
                                </div>
                                <div className="h-2.5 w-full rounded-full bg-gray-800 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${cat.color} transition-all duration-500`}
                                        style={{ width: `${cat.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Priority Distribution & Insights */}
                <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-white">Priority Distribution</h2>
                        <p className="text-xs text-gray-400 mb-6">Ratio of completed tasks grouped by urgency level</p>

                        <div className="space-y-4">
                            {priorityDistribution.map((item) => (
                                <div
                                    key={item.priority}
                                    className="flex items-center justify-between p-3 rounded-lg bg-gray-950/40 border border-gray-800"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${item.badge}`}>
                                            {item.priority}
                                        </span>
                                        <span className="text-sm font-medium text-white">
                                            {item.count} tasks
                                        </span>
                                    </div>
                                    <span className="text-xs font-semibold text-blue-400 font-mono">
                                        {item.percent}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-800">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span className="text-base">💡</span>
                            <span>
                                <strong className="text-gray-200">Peak Performance:</strong> You achieve 68% of your high-priority completions on Tuesdays and Thursdays.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
