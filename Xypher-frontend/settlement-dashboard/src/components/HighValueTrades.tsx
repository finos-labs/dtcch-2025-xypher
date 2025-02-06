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
  {
    id: "TR502699137",
    quantity: 50000,
    price: 3000.5,
    counterparty_1: "Goldman Sachs",
    counterparty_2: "HSBC",
    execution_time: "2024-02-01 10:15:00",
    instrumentType: "Equity",
    currency: "USD",
    riskScore: 0.92,
    buy_sell: "Buy",
    status: "Completed",
  },
  {
    id: "TR5026996837",
    quantity: 100000,
    price: 150.75,
    counterparty_1: "JP Morgan",
    counterparty_2: "Barclays",
    execution_time: "2024-02-02 14:22:30",
    instrumentType: "Bond",
    currency: "USD",
    riskScore: 0.85,
    buy_sell: "Sell",
    status: "Pending",
  },
  {
    id: "TR506699137",
    quantity: 25000,
    price: 2500.0,
    counterparty_1: "Citigroup",
    counterparty_2: "Deutsche Bank",
    execution_time: "2024-02-03 09:30:00",
    instrumentType: "Equity",
    currency: "USD",
    riskScore: 0.88,
    buy_sell: "Buy",
    status: "Completed",
  },
  {
    id: "TR502699198",
    quantity: 75000,
    price: 180.25,
    counterparty_1: "Morgan Stanley",
    counterparty_2: "UBS",
    execution_time: "2024-02-04 11:10:45",
    instrumentType: "ETF",
    currency: "USD",
    riskScore: 0.9,
    buy_sell: "Sell",
    status: "Completed",
  },
  {
    id: "TR502699596",
    quantity: 200000,
    price: 500.25,
    counterparty_1: "Wells Fargo",
    counterparty_2: "Credit Suisse",
    execution_time: "2024-02-05 13:05:30",
    instrumentType: "Bond",
    currency: "USD",
    riskScore: 0.95,
    buy_sell: "Buy",
    status: "Pending",
  },
  {
    id: "TR502630137",
    quantity: 120000,
    price: 675.5,
    counterparty_1: "Bank of America",
    counterparty_2: "Citigroup",
    execution_time: "2024-02-06 15:25:45",
    instrumentType: "Equity",
    currency: "USD",
    riskScore: 0.8,
    buy_sell: "Sell",
    status: "Completed",
  },
  {
    id: "TR502699039",
    quantity: 80000,
    price: 120.3,
    counterparty_1: "Deutsche Bank",
    counterparty_2: "Goldman Sachs",
    execution_time: "2024-02-07 08:30:15",
    instrumentType: "Bond",
    currency: "USD",
    riskScore: 0.87,
    buy_sell: "Buy",
    status: "Pending",
  },
  {
    id: "TR502699938",
    quantity: 95000,
    price: 1750.9,
    counterparty_1: "Barclays",
    counterparty_2: "UBS",
    execution_time: "2024-02-08 16:40:00",
    instrumentType: "ETF",
    currency: "USD",
    riskScore: 0.89,
    buy_sell: "Sell",
    status: "Completed",
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
