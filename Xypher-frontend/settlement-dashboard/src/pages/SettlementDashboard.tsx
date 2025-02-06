import { CashFlowCard } from "@/components/CashFlowCard";
import { CashFlowChart } from "@/components/CashflowPredictionsChart";
import { TradeErrorsChart } from "@/components/ErrorDetectionTypes";
import { FlaggedTradesCard } from "@/components/FlaggedTrades";
import { HighValueTrades } from "@/components/HighValueTrades";
import { ThemeToggle } from "@/components/theme-toggle";
import { TradeSimulation } from "@/components/TradeSimulation";
import TradeTable from "@/components/TradeVerificationTable";
import { Shield } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Order {
  quantity: number;
  price: number;
}

function generateRandomOrders(basePrice: number, isAsk: boolean): Order[] {
  const orders: Order[] = [];
  const count = 8;
  const priceRange = isAsk ? [0.5, 3] : [-3, -0.5];
  const quantityRange = [1, 100];

  for (let i = 0; i < count; i++) {
    const quantity = Math.round(
      Math.random() * (quantityRange[1] - quantityRange[0]) + quantityRange[0]
    );

    const priceVariation =
      Math.random() * (priceRange[1] - priceRange[0]) + priceRange[0];
    const price = Number((basePrice + priceVariation).toFixed(1));

    orders.push({
      quantity,
      price,
    });
  }

  return orders.sort(() => Math.random() - 0.5);
}
const SettlementDashboard = () => {
  const [basePrice, setBasePrice] = useState(98603.4);
  const [bids, setBids] = useState<Order[]>([]);
  const [asks, setAsks] = useState<Order[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newBasePrice = basePrice + (Math.random() - 0.5) * 5;
      setBasePrice(newBasePrice);

      setBids(generateRandomOrders(newBasePrice, false));
      setAsks(generateRandomOrders(newBasePrice, true));
    }, 5000);

    return () => clearInterval(interval);
  }, [basePrice]);
  return (
    <div className="flex flex-col px-4 py-4 w-full min-h-[100vh] gap-4  overflow-y-auto  ">
      <h1 className=" self-center px-8 py-8 mb-12 rounded-lg relative top-1 text-4xl font-bold tracking-tight text-primary self-center">
        SETTLEMENT DASHBOARD
      </h1>
      <div className="flex flex-row gap-4 min-h-fit max-h-[10vh]">
        <CashFlowCard trend="up" title="Cash Inflow" />
        <CashFlowCard trend="down" title="Cash Outflow" />
        <FlaggedTradesCard />
        <HighValueTrades />
      </div>
      <div className="flex flex-row gap-4 w-full max-h-[60vh] bg-background transition-colors">
        <div className="  grow-3 min-h-[40vh] max-h-[60vh]  overflow-auto rounded-lg border bg-background">
          <div className="container flex items-center px-4">
            <div className="flex items-center space-x-2">
              <Shield className="mt-6 h-6 w-6" />
              <h1 className="mt-6 text-xl font-bold">
                Trade Verification System
              </h1>
            </div>
          </div>
          <div className="container mx-auto py-8 px-4 overflow-y-auto">
            <TradeTable />
          </div>
        </div>
        <div className=" grow-1 flex rounded-lg border  min-w-fit items-center justify-center p-4">
          <TradeSimulation bids={bids} asks={asks} spread={basePrice} />
        </div>
      </div>
      <div className=" max-w-[100%] min-h-[40vh] max-h-[60vh] px-6 overflow-auto rounded-lg border min-h-fit bg-background">
        <h1 className="mt-6 text-xl font-bold">AI Predcitions</h1>
        <div className="flex flex-row gap-5 my-6 min-h-fit max-h-[10vh]">
          <TradeErrorsChart />
          <CashFlowChart />
        </div>
      </div>
    </div>
  );
};

export default SettlementDashboard;
