import { useMemo, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

interface Order {
  quantity: number;
  price: number;
}

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
const TradeSimulationComponent = () => {
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

  const bidVolume = useMemo(
    () => bids.reduce((sum, bid) => sum + bid.quantity, 0),
    [bids]
  );
  const askVolume = useMemo(
    () => asks.reduce((sum, ask) => sum + ask.quantity, 0),
    [asks]
  );
  const totalVolume = bidVolume + askVolume;

  const bidPercentage = Math.round((bidVolume / totalVolume) * 100);
  const askPercentage = 100 - bidPercentage;

  const bidStats = useMemo(() => {
    if (bids.length === 0) return { min: 0, max: 0 };
    const prices = bids.map((b) => b.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [bids]);

  const askStats = useMemo(() => {
    if (asks.length === 0) return { min: 0, max: 0 };
    const prices = asks.map((a) => a.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [asks]);

  const getBidPercentage = (price: number) => {
    if (bidStats.max === bidStats.min) return 100;
    return ((price - bidStats.min) / (bidStats.max - bidStats.min)) * 100;
  };

  const getAskPercentage = (price: number) => {
    if (askStats.max === askStats.min) return 100;
    return ((price - askStats.min) / (askStats.max - askStats.min)) * 100;
  };

  return (
    <div className="flex flex-col w-full max-h-[100%] max-w-3xl mx-auto bg-card text-card-foreground p-6 rounded-lg shadow-lg">
      {/* Header */}
      <h2 className="self-center mb-6 text-3xl font-bold tracking-tight text-primary">
        Order Book
      </h2>
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <div className="text-muted-foreground min-w-[80px]">
            Bids <span className="text-[#00C087]">{bidPercentage}%</span>
          </div>
          <div className="flex-1 h-1.5 mx-4 rounded overflow-hidden">
            <div className="h-full relative">
              <div className="absolute inset-0 bg-[#FF5C5C] opacity-30" />
              <div
                className="absolute inset-y-0 left-0 bg-[#00C087] transition-all duration-300"
                style={{ width: `${bidPercentage}%` }}
              />
            </div>
          </div>
          <div className="text-muted-foreground min-w-[80px] text-right">
            <span className="text-[#FF5C5C]">{askPercentage}%</span> Asks
          </div>
        </div>
      </div>

      {/* Order Book Table */}
      <div className="grid grid-cols-2 gap-4">
        {/* Bids */}
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="text-muted-foreground">Quantity</TableHead>
              <TableHead className="text-right text-muted-foreground">
                Price(USDT)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bids.map((bid, index) => (
              <TableRow
                key={`${bid.price}-${index}`}
                className="relative hover:bg-transparent border-none group"
              >
                <TableCell className="font-medium">{bid.quantity}</TableCell>
                <TableCell className="text-right text-[#00C087]">
                  {bid.price.toLocaleString()}
                  <div
                    className="absolute right-0 top-0 h-full bg-[#00C087]/10 group-hover:bg-[#00C087]/20 transition-all"
                    style={{
                      width: `${getBidPercentage(bid.price)}%`,
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Asks */}
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="text-muted-foreground">
                Price(USDT)
              </TableHead>
              <TableHead className="text-right text-muted-foreground">
                Quantity
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {asks.map((ask, index) => (
              <TableRow
                key={`${ask.price}-${index}`}
                className="relative hover:bg-transparent border-none group"
              >
                <TableCell className="text-[#FF5C5C]">
                  {ask.price.toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {ask.quantity}
                  <div
                    className="absolute left-0 top-0 h-full bg-[#FF5C5C]/10 group-hover:bg-[#FF5C5C]/20 transition-all"
                    style={{
                      width: `${getAskPercentage(ask.price)}%`,
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Memoizing the component
export const TradeSimulation = React.memo(TradeSimulationComponent);
