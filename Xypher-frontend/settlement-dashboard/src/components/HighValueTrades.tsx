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
import { HighValueTrade } from "../../types";
const trades: HighValueTrade[] = [
  {
    id: "T123",
    counterpartyId: "CP456",
    securityType: "Equity",
    tradeType: "Buy",
    price: 1500000,
    quantity: 10000,
    timestamp: "2024-03-20T10:30:00",
    currency: "USD",
    tradeHistory: "Stable",
    tradeFrequency: "High",
    marketLiquidity: "Medium",
    marketVolatility: "Low",
  },
  {
    id: "T124",
    counterpartyId: "CP789",
    securityType: "Fixed Income",
    tradeType: "Sell",
    price: 2300000,
    quantity: 15000,
    timestamp: "2024-03-20T11:15:00",
    currency: "USD",
    tradeHistory: "Volatile",
    tradeFrequency: "Medium",
    marketLiquidity: "High",
    marketVolatility: "Medium",
  },
  {
    id: "T125",
    counterpartyId: "CP234",
    securityType: "Derivatives",
    tradeType: "Buy",
    price: 1800000,
    quantity: 8000,
    timestamp: "2024-03-20T09:45:00",
    currency: "USD",
    tradeHistory: "Stable",
    tradeFrequency: "Low",
    marketLiquidity: "Medium",
    marketVolatility: "High",
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
                <TableHead>Actions</TableHead>
                <TableHead>Trade ID</TableHead>
                <TableHead>Counterparty ID</TableHead>
                <TableHead>Security Type</TableHead>
                <TableHead>Trade Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Trade History</TableHead>
                <TableHead>Trade Frequency</TableHead>
                <TableHead>Market Liquidity</TableHead>
                <TableHead>Market Volatility</TableHead>
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
                        ? "Approved"
                        : "Initiate Approvals"}
                    </Button>
                  </TableCell>
                  <TableCell>{trade.id}</TableCell>
                  <TableCell>{trade.counterpartyId}</TableCell>
                  <TableCell>{trade.securityType}</TableCell>
                  <TableCell>{trade.tradeType}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(trade.price)}
                  </TableCell>
                  <TableCell>{trade.quantity.toLocaleString()}</TableCell>
                  <TableCell>
                    {new Date(trade.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>{trade.currency}</TableCell>
                  <TableCell>{trade.tradeHistory}</TableCell>
                  <TableCell>{trade.tradeFrequency}</TableCell>
                  <TableCell>{trade.marketLiquidity}</TableCell>
                  <TableCell>{trade.marketVolatility}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};
