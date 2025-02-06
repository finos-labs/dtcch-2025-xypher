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

// Mock data for demonstration
const mockFlaggedTrades = [
  {
    tradeId: "T123",
    counterpartyId: "CP456",
    securityType: "Equity",
    price: 150.25,
    quantity: 1000,
    timestamp: "2024-03-20T10:30:00Z",
  },
  {
    tradeId: "T124",
    counterpartyId: "CP789",
    securityType: "Bond",
    price: 98.75,
    quantity: 5000,
    timestamp: "2024-03-20T11:15:00Z",
  },
  {
    tradeId: "T125",
    counterpartyId: "CP234",
    securityType: "Options",
    price: 5.75,
    quantity: 10000,
    timestamp: "2024-03-20T12:45:00Z",
  },
  {
    tradeId: "T126",
    counterpartyId: "CP567",
    securityType: "Futures",
    price: 2750.5,
    quantity: 50,
    timestamp: "2024-03-20T13:20:00Z",
  },
  {
    tradeId: "T127",
    counterpartyId: "CP890",
    securityType: "ETF",
    price: 45.8,
    quantity: 3000,
    timestamp: "2024-03-20T14:10:00Z",
  },
  {
    tradeId: "T128",
    counterpartyId: "CP123",
    securityType: "Forex",
    price: 1.25,
    quantity: 1000000,
    timestamp: "2024-03-20T15:05:00Z",
  },
  {
    tradeId: "T129",
    counterpartyId: "CP345",
    securityType: "Commodity",
    price: 1850.75,
    quantity: 100,
    timestamp: "2024-03-20T15:45:00Z",
  },
  {
    tradeId: "T130",
    counterpartyId: "CP678",
    securityType: "Corporate Bond",
    price: 102.25,
    quantity: 2500,
    timestamp: "2024-03-20T16:30:00Z",
  },
  {
    tradeId: "T131",
    counterpartyId: "CP901",
    securityType: "Municipal Bond",
    price: 99.5,
    quantity: 3500,
    timestamp: "2024-03-20T17:15:00Z",
  },
  {
    tradeId: "T132",
    counterpartyId: "CP432",
    securityType: "Treasury",
    price: 97.25,
    quantity: 7500,
    timestamp: "2024-03-20T17:45:00Z",
  },
];

const totalVolume = mockFlaggedTrades.reduce(
  (acc, trade) => acc + trade.price * trade.quantity,
  0
);

export function FlaggedTradesCard() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="w-full cursor-pointer transition-all hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">
              <div className="flex items-center gap-2">
                <Flag className="h-6 w-6 text-red-500" />
                Flagged Trades
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockFlaggedTrades.length}</div>
            <p className="text-xs text-muted-foreground">
              Total Volume: ${totalVolume.toLocaleString()}
            </p>
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
                <TableRow key={trade.tradeId}>
                  <TableCell className="font-medium">{trade.tradeId}</TableCell>
                  <TableCell>{trade.counterpartyId}</TableCell>
                  <TableCell>{trade.securityType}</TableCell>
                  <TableCell>${trade.price.toFixed(2)}</TableCell>
                  <TableCell>{trade.quantity.toLocaleString()}</TableCell>
                  <TableCell>
                    {new Date(trade.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      onClick={() => {
                        console.log(`Investigating trade ${trade.tradeId}`);
                      }}
                    >
                      Investigate
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
