import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { TrendingUpIcon as ArrowTrendingUpIcon } from "lucide-react";

interface CashFlow {
  name: string;
  inflow: number;
  outflow: number;
}

const dailyData: CashFlow[] = [
  { name: "9 AM", inflow: 45000, outflow: 22000 },
  { name: "11 AM", inflow: 82000, outflow: 43000 },
  { name: "1 PM", inflow: 67000, outflow: 31000 },
  { name: "3 PM", inflow: 34000, outflow: 44000 },
  { name: "5 PM", inflow: 56000, outflow: 28000 },
];

const weeklyData: CashFlow[] = [
  { name: "Mon", inflow: 245000, outflow: 122000 },
  { name: "Tue", inflow: 382000, outflow: 243000 },
  { name: "Wed", inflow: 267000, outflow: 131000 },
  { name: "Thu", inflow: 334000, outflow: 244000 },
  { name: "Fri", inflow: 456000, outflow: 328000 },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border rounded-lg shadow-lg p-3">
        <p className="font-semibold mb-1">{label}</p>
        <p className="text-sm text-primary">
          Inflow: {formatCurrency(payload[0].value)}
        </p>
        <p className="text-sm text-destructive">
          Outflow: {formatCurrency(payload[1].value)}
        </p>
      </div>
    );
  }
  return null;
};

export function CashFlowChart() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <div className="p-6">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold">Cash Flow Predictions</h2>
            <p className="text-sm text-muted-foreground mt-1">
              January - June 2024
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ArrowTrendingUpIcon className="w-4 h-4" />
            <span>Trending up by 5.2% this month</span>
          </div>
        </div>

        <Tabs defaultValue="day" className="w-full">
          <TabsList className="grid max-w-[50vw] mt-2 mb-6 h-10 py-0 max-w-fit grid-cols-2 gap-2">
            <TabsTrigger value="day">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
          </TabsList>

          <TabsContent value="day" className="mt-0">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dailyData}
                  margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis
                    tickFormatter={(value) => `$${value / 1000}k`}
                    className="text-xs"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="inflow"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="outflow"
                    fill="hsl(var(--destructive))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="week" className="mt-0">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis
                    tickFormatter={(value) => `$${value / 1000}k`}
                    className="text-xs"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="inflow"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="outflow"
                    fill="hsl(var(--destructive))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-center gap-8 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm">Cash Inflow</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <span className="text-sm">Cash Outflow</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
