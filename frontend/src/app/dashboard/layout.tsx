import Sidebar from "@/src/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      <Sidebar />
      <main className="ml-64 flex-1 bg-gray-950 p-6 md:p-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}