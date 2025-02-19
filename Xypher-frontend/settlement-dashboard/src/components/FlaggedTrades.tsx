import { Flag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trade } from "types";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
const mockFlaggedTrades: Trade[] = [
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
    quantity: 100000000,
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
    quantity: 100020000,
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
    quantity: 102003000,
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
    quantity: 123020000,
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
    quantity: 123020000,
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
    quantity: 123020120,
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
    quantity: 123320120,
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
    quantity: 122220120,
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
    quantity: 122220120,
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
    quantity: 122225030,
  },
];
const totalVolume = mockFlaggedTrades.reduce(
  (acc, trade) => acc + trade.price * (trade.quantity || 0),
  0
);

export function FlaggedTradesCard() {
  const { toast } = useToast();
  const [investigate, setInvestigate] = useState<Set<string>>(new Set());
  const handleInvestigate = (tradeId: string) => {
    toast({
      title: "Investigation Initiated",
      description: `Trade details for ${tradeId} communicated to operational manager`,
      duration: 3000,
    });
    setInvestigate((prev) => new Set([...prev, tradeId]));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="w-full min-h-full cursor-pointer transition-all hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">
              <div className="flex items-center gap-2">
                <Flag className="h-6 w-6 text-red-500" />
                Flagged Trades
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-red-500">
                {mockFlaggedTrades.length}
              </p>
              <p className="text-sm text-muted-foreground">
                Total Volume: ${totalVolume.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl  max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Flag className="h-5 w-5 text-red-500" />
            Flagged Trades Details
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trade ID</TableHead>
                <TableHead>Counterparty ID</TableHead>
                <TableHead>Security Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFlaggedTrades.map((trade) => (
                <TableRow key={trade.id}>
                  <TableCell className="font-medium">{trade.id}</TableCell>
                  <TableCell>{trade.counterparty_1}</TableCell>
                  <TableCell>{trade.securityType}</TableCell>
                  <TableCell>${trade.price.toFixed(2)}</TableCell>
                  <TableCell>
                    {(trade?.quantity || 0).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(trade.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInvestigate(trade.id);
                      }}
                      disabled={investigate.has(trade.id)}
                    >
                      {investigate.has(trade.id)
                        ? "Under Investigation"
                        : "Investigate"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
