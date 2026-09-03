export interface ProductivityDay {
  day: string;
  value: number;
}

interface ProductivityChartProps {
  data: ProductivityDay[];
  title?: string;
}

export default function ProductivityChart({
  data,
  title = "Weekly Productivity",
}: ProductivityChartProps) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <span className="text-xs font-medium text-gray-400 bg-gray-800 px-2.5 py-1 rounded-md">
          Last 7 Days
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {data.map((item) => (
          <div key={item.day}>
            <div className="mb-1.5 flex justify-between text-sm">
              <span className="font-medium text-gray-300">{item.day}</span>
              <span className="text-xs font-semibold text-blue-400">{item.value}%</span>
            </div>

            <div className="h-2.5 w-full rounded-full bg-gray-800">
              <div
                className="h-2.5 rounded-full bg-blue-600 transition-all duration-500"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}