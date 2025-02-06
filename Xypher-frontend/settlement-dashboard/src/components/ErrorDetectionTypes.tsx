import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface TradeError {
  name: string;
  value: number;
  color: string;
}

const data: TradeError[] = [
  { name: "Missing Data", value: 45, color: "#3b82f6" },
  { name: "Invalid Price", value: 30, color: "#22c55e" },
  { name: "Regulatory Violation", value: 15, color: "#f43f5e" },
  { name: "Execution Delay", value: 25, color: "#f59e0b" },
  { name: "Data Mismatch", value: 20, color: "#8b5cf6" },
];

const totalTrades = data.reduce((sum, item) => sum + item.value, 0);
const totalValue = 2457890; // Example total cash value in USD

export function TradeErrorsChart() {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <div className="p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold">Trade Error Detection Types</h2>
          <p className="text-sm text-muted-foreground mt-1">January - June 2024</p>
        </div>

        <div className="relative h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Centered text overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold">{totalTrades}</div>
              <div className="text-sm text-muted-foreground">Total Trades</div>
              <div className="mt-2 text-lg font-semibold">
                ${(totalValue / 1000000).toFixed(2)}M
              </div>
              <div className="text-sm text-muted-foreground">Total Value</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm flex-1">{item.name}</span>
              <span className="text-sm font-medium">{item.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Trending up by 5.2% this month
          </p>
        </div>
      </div>
    </Card>
  );
}