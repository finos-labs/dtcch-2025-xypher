import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useTheme } from "./theme-provider";
import { ChartConfig, ChartContainer } from "./ui/chart";

// Mock data - replace with real data in production
const mockData = {
  "24h": [
    { time: "00:00", amount: 1200 },
    { time: "06:00", amount: 2100 },
    { time: "12:00", amount: 1800 },
    { time: "18:00", amount: 2400 },
  ],
  "1week": [
    { time: "Mon", amount: 8500 },
    { time: "Tue", amount: 7200 },
    { time: "Wed", amount: 9100 },
    { time: "Thu", amount: 8700 },
    { time: "Fri", amount: 9600 },
    { time: "Sat", amount: 7800 },
    { time: "Sun", amount: 8200 },
  ],
  "1month": [
    { time: "Week 1", amount: 32000 },
    { time: "Week 2", amount: 35000 },
    { time: "Week 3", amount: 37500 },
    { time: "Week 4", amount: 34000 },
  ],
};


export function CashFlowCard({
  title,
  trend = "upward",
  data,
}: {
  title: string;
  trend: string;
  data: {
    trend?: string;
    "24h": { time: string; amount: number }[];
    "1week": { time: string; amount: number }[];
    "1month": { time: string; amount: number }[];
  };
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("24h");
  const { theme } = useTheme();

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate total for last 24h
  const total24h = data ? data["24h"].reduce((sum, item) => sum + item.amount, 0): mockData["24h"].reduce((sum, item) => sum + item.amount, 0);

  // Theme-aware colors
  const gridColor =
    theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
  const textColor = theme === "dark" ? "#FFFFFF" : "#000000";
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;
  console.log("himanshu",data)
  return (
    <>
      <Card
        className="w-full min-h-full cursor-pointer transition-all hover:shadow-lg"
        onClick={() => setIsModalOpen(true)}
      >
        <CardContent className="py-2 px-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {trend === "upward" ? (
                <TrendingUp className="h-5 w-5 text-green-500" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-500" />
              )}
              <div className="text-xl font-bold">{title}</div>
            </div>
            <span className="text-sm text-muted-foreground">24h</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-green-500">
              {formatCurrency(total24h)}
            </p>
            <p className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xl max-h-fit">
          <DialogHeader>
            <DialogTitle>{title} Analysis</DialogTitle>
          </DialogHeader>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid mt-2 mb-6 h-10 py-0 w-full grid-cols-3 gap-3">
              <TabsTrigger value="24h">Last 24 Hours</TabsTrigger>
              <TabsTrigger value="1week">Last Week</TabsTrigger>
              <TabsTrigger value="1month">Last Month</TabsTrigger>
            </TabsList>
            {Object.entries(data ? data : mockData).map(([period, data]) => (
              <TabsContent key={period} value={period}>
                <div className="h-[300px] mt-4 ">
                  <ChartContainer className="max-h-full" config={chartConfig}>
                    <BarChart
                      data={data}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis
                        dataKey="time"
                        stroke={textColor}
                        tick={{ fill: textColor }}
                      />
                      <YAxis
                        tickFormatter={(value) =>
                          `Rs ${value.toLocaleString()}`
                        }
                        stroke={textColor}
                        tick={{ fill: textColor }}
                      />
                      <Tooltip
                        formatter={(value) => [
                          `$${value.toLocaleString()}`,
                          title,
                        ]}
                        contentStyle={{
                          backgroundColor:
                            theme === "dark" ? "#1a1a1a" : "#ffffff",
                          border: `1px solid ${gridColor}`,
                          color: textColor,
                        }}
                      />
                      <Bar
                        dataKey="amount"
                        fill="hsl(var(--chart-1))"
                        radius={8}
                      />
                    </BarChart>
                  </ChartContainer>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
