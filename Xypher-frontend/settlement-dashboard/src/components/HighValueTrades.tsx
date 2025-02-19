import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, Clock, BarChart3 } from "lucide-react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Trade } from "types";

const trades: Trade[] = [
  // Active Trades
  {
    id: "TR001",
    counterparty_1: "CP123",
    counterparty_2: "CP122",
    securityType: "Equity",
    tradeType: "Buy", // Changed 'side' to 'tradeType'
    price: 150.25,
    timestamp: "2024-03-20T10:30:00",
    currency: "USD",
    tradeHistory: "Legitimate",
    tradeFrequency: "High",
    marketLiquidity: "Medium",
    marketVolatility: "Low",
    status: "active",
  },
  {
    id: "TR002",
    counterparty_1: "CP123",
    counterparty_2: "CP122",
    securityType: "Fixed Income",
    tradeType: "Sell", // Changed 'side' to 'tradeType'
    price: 98.75,
    timestamp: "2024-03-20T11:15:00",
    currency: "EUR",
    tradeHistory: "Suspicious",
    tradeFrequency: "Low",
    marketLiquidity: "High",
    marketVolatility: "Medium",
    status: "active",
  },
  {
    id: "TR003",
    counterparty_1: "CP123",
    counterparty_2: "CP122",
    securityType: "Derivatives",
    tradeType: "Buy", // Changed 'side' to 'tradeType'
    price: 25.5,
    timestamp: "2024-03-20T09:45:00",
    currency: "GBP",
    tradeHistory: "Legitimate",
    tradeFrequency: "Medium",
    marketLiquidity: "Low",
    marketVolatility: "High",
    status: "active",
  },
  // Pending Trades
  {
    id: "TR004",
    counterparty_1: "CP123",
    counterparty_2: "CP122",
    securityType: "ETF",
    tradeType: "Buy", // Changed 'side' to 'tradeType'
    price: 75.3,
    timestamp: "2024-03-20T14:20:00",
    currency: "USD",
    tradeHistory: "Legitimate",
    tradeFrequency: "High",
    marketLiquidity: "High",
    marketVolatility: "Low",
    status: "pending",
  },
  {
    id: "TR005",
    counterparty_1: "CP123",
    counterparty_2: "CP122",
    securityType: "Forex",
    tradeType: "Sell", // Changed 'side' to 'tradeType'
    price: 1.215,
    timestamp: "2024-03-20T15:45:00",
    currency: "EUR/USD",
    tradeHistory: "Suspicious",
    tradeFrequency: "Very High",
    marketLiquidity: "Medium",
    marketVolatility: "High",
    status: "pending",
  },
  {
    id: "TR006",
    counterparty_1: "CP123",
    counterparty_2: "CP122",
    securityType: "Options",
    tradeType: "Buy", // Changed 'side' to 'tradeType'
    price: 3.45,
    timestamp: "2024-03-20T16:10:00",
    currency: "JPY",
    tradeHistory: "Legitimate",
    tradeFrequency: "Low",
    marketLiquidity: "Low",
    marketVolatility: "Medium",
    status: "pending",
  },
  // Historical Trades
  {
    id: "TR007",
    counterparty_1: "CP123",
    counterparty_2: "CP122",
    securityType: "Equity",
    tradeType: "Sell", // Changed 'side' to 'tradeType'
    price: 200.0,
    timestamp: "2024-03-19T10:00:00",
    currency: "USD",
    tradeHistory: "Legitimate",
    tradeFrequency: "Medium",
    marketLiquidity: "High",
    marketVolatility: "Low",
    status: "history",
  },
  {
    id: "TR008",
    counterparty_1: "CP123",
    counterparty_2: "CP122",
    securityType: "Bond",
    tradeType: "Buy", // Changed 'side' to 'tradeType'
    price: 101.25,
    timestamp: "2024-03-19T11:30:00",
    currency: "GBP",
    tradeHistory: "Legitimate",
    tradeFrequency: "Low",
    marketLiquidity: "Medium",
    marketVolatility: "Low",
    status: "history",
  },
  {
    id: "TR009",
    counterparty_1: "CP123",
    counterparty_2: "CP122",
    securityType: "Futures",
    tradeType: "Sell", // Changed 'side' to 'tradeType'
    price: 45.6,
    timestamp: "2024-03-19T14:15:00",
    currency: "USD",
    tradeHistory: "Suspicious",
    tradeFrequency: "High",
    marketLiquidity: "Low",
    marketVolatility: "Very High",
    status: "history",
  },
  {
    id: "TR010",
    counterparty_1: "CP123",
    counterparty_2: "CP122",
    securityType: "Swap",
    tradeType: "Buy", // Changed 'side' to 'tradeType'
    price: 98.15,
    timestamp: "2024-03-19T15:45:00",
    currency: "EUR",
    tradeHistory: "Legitimate",
    tradeFrequency: "Medium",
    marketLiquidity: "Medium",
    marketVolatility: "Medium",
    status: "history",
  },
];
export const HighValueTrades = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [approvedTrades, setApprovedTrades] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  // Calculate total value and format it
  const totalValue = trades.reduce((sum, trade) => sum + trade.price, 0);
  const formattedTotalValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(totalValue);

  const handleInitiateApprovals = (tradeId: string) => {
    toast({
      title: "Approvals Initiated",
      description: `Approvals for trade ID ${tradeId} has been initiated.`,
      duration: 3000,
    });
    setApprovedTrades((prev) => new Set([...prev, tradeId]));
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Card
          className="w-full min-h-full cursor-pointer transition-all hover:shadow-lg"
          onClick={() => setIsModalOpen(true)}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold">
              High Value Trades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center">
                <div className="flex items-center space-x-2 text-muted-foreground mb-1">
                  <BarChart3 className="h-4 w-4" />
                  <span className="text-sm">Count</span>
                </div>
                <span className="text-2xl font-bold">{trades.length}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center space-x-2 text-muted-foreground mb-1">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-sm">Value</span>
                </div>
                <span className="text-2xl font-bold">
                  {formattedTotalValue}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center space-x-2 text-muted-foreground mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">24h</span>
                </div>
                <span className="text-2xl font-bold">Live</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw]">
        <DialogHeader>
          <DialogTitle>High Value Trades (24h Window)</DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Actions</TableHead>
                <TableHead>Trade ID</TableHead>
                <TableHead>TRADE QUANTITY</TableHead>
                <TableHead>PRICE</TableHead>
                <TableHead>COUNTERPARTY_1</TableHead>
                <TableHead>COUNTERPARTY_2</TableHead>
                <TableHead>EXECUTION TIME</TableHead>
                <TableHead>INSTRUMENT TYPE</TableHead>
                <TableHead>CURRENCY</TableHead>
                <TableHead>RISK SCORE</TableHead>
                <TableHead>BUY/SELL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trades.map((trade) => (
                <TableRow key={trade.id}>
                  <TableCell>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInitiateApprovals(trade.id);
                      }}
                      disabled={approvedTrades.has(trade.id)}
                    >
                      {approvedTrades.has(trade.id)
                        ? "Awaiting Approvals"
                        : "Initiate Approvals"}
                    </Button>
                  </TableCell>
                  <TableCell>{trade.id}</TableCell>
                  <TableCell>{trade.quantity}</TableCell>
                  <TableCell>{trade.price}</TableCell>
                  <TableCell>{trade.counterparty_1}</TableCell>
                  <TableCell>{trade.counterparty_2}</TableCell>
                  <TableCell>
                    {new Date(trade.execution_time).toLocaleString()}
                  </TableCell>
                  <TableCell>{trade.instrumentType}</TableCell>
                  <TableCell>{trade.currency}</TableCell>
                  <TableCell>{trade.riskScore}</TableCell>
                  <TableCell>{trade.buy_sell}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};
