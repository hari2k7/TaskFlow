import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="flex h-screen w-64 flex-col bg-gray-900 p-6 text-white">
            {/* Logo */}
            <h1 className="text-2xl font-bold">
                TaskFlow
            </h1>

            {/* Navigation */}
            <nav className="mt-8 flex flex-col gap-1">
                <Link
                    href="/dashboard"
                    className="rounded-md px-3 py-2 hover:bg-gray-800"
                >
                    Dashboard
                </Link>

                <Link
                    href="/dashboard/tasks"
                    className="rounded-md px-3 py-2 hover:bg-gray-800"
                >
                    My Tasks
                </Link>

                <Link
                    href="/dashboard/goals"
                    className="rounded-md px-3 py-2 hover:bg-gray-800"
                >
                    Goals
                </Link>

                <Link
                    href="/dashboard/calendar"
                    className="rounded-md px-3 py-2 hover:bg-gray-800"
                >
                    Calendar
                </Link>

                <Link
                    href="/dashboard/focus"
                    className="rounded-md px-3 py-2 hover:bg-gray-800"
                >
                    Focus / Pomodoro
                </Link>

                <Link
                    href="/dashboard/notes"
                    className="rounded-md px-3 py-2 hover:bg-gray-800"
                >
                    Notes
                </Link>

                <Link
                    href="/dashboard/workspace"
                    className="rounded-md px-3 py-2 hover:bg-gray-800"
                >
                    Workspace
                </Link>

                <Link
                    href="/dashboard/settings"
                    className="rounded-md px-3 py-2 hover:bg-gray-800"
                >
                    Settings
                </Link>
            </nav>

            {/* User section */}
            <div className="mt-auto border-t border-gray-700 pt-4">
                <p className="text-sm text-gray-400">
                    Signed in as
                </p>

                <p className="font-medium">
                    UserName
                </p>
            </div>
        </aside>
    );
}