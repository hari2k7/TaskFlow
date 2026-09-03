interface ProductivityDay {
  day: string;
  value: number;
}

interface ProductivityChartProps {
  data: ProductivityDay[];
}

export default function ProductivityChart({
  data,
}: ProductivityChartProps) {
  return (
    <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Weekly Productivity</h2>

      <div className="mt-6 space-y-4">
        {data.map((item) => (
          <div key={item.day}>
            <div className="mb-1 flex justify-between text-sm">
              <span>{item.day}</span>
              <span>{item.value}%</span>
            </div>

            <div className="h-3 w-full rounded-full bg-gray-200">
              <div
                className="h-3 rounded-full bg-blue-600"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}