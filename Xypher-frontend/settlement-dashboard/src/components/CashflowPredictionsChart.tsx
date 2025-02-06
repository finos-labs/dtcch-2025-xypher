import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { TrendingUpIcon as ArrowTrendingUpIcon } from 'lucide-react';
import apiCall from '@/ApiRequest/ApiCall';

interface CashFlow {
  name: string;
  inflow: number;
  outflow: number;
  net_flow: number;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

interface ResponseData {
  predicted_inflows: number;
  predicted_outflows: number;
  net_flow:number;
}

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
        <p className="text-sm text-primary">
          Netflow: {formatCurrency(payload[2].value)}
        </p>
      </div>
    );
  }
  return null;
};

export function CashFlowChart() {
  const [data, setData] = useState<CashFlow[]>([]);

  useEffect(() => {
    const config = {
      method: 'POST',
      url: 'https://okaa2ys1d8.execute-api.us-west-2.amazonaws.com/liquidity-forecast-lambda',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        query: 'Get me data in said format',
      },
    };

    apiCall(config)
      .then((response) => {
        try {
          const responseData = response.data.response.replace(
            /^.*```json\n/,
            ''
          );
          const parsedData: ResponseData[] = JSON.parse(responseData);
          console.log(parsedData);

          const chartData = parsedData.map((item, index) => ({
            name: `Day ${index + 1}`,
            inflow: item.predicted_inflows,
            outflow: item.predicted_outflows,
            net_flow: item. net_flow,
          }));

          setData(chartData);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      })
      .catch((error) => {
        console.error('vatsal', error);
      });
  }, []);

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
          {/* <TabsList className="mb-4">
            <TabsTrigger value="day">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
          </TabsList> */}

          <TabsContent value="day" className="mt-0">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
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
                    radius={[4, 4,0,0]}
                    />
                     <Bar
                    dataKey="net_flow"
                    fill="hsl(var(--blue))"
                    radius={[4, 4,0,0]}
                    />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
    
              <TabsContent value="week" className="mt-0">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data}
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
                       <Bar
                    dataKey="net_flow"
                    fill="hsl(var(--secondary))"
                    radius={[4, 4,0,0]}
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
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary" />
                <span className="text-sm">Net Flow</span>
              </div>
            </div>
          </div>
        </Card>
      );
    }