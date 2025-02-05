import { useState } from "react";
import { Eye, ChevronDown, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const trades = [
  {
    id: "TR001",
    counterpartyId: "CP123",
    securityType: "Equity",
    side: "Buy",
    price: 150.25,
    timestamp: "2024-03-20T10:30:00",
    currency: "USD",
    tradeHistory: "Legitimate",
    tradeFrequency: "High",
    marketLiquidity: "Medium",
    marketVolatility: "Low",
    status: "active",
  },
  // Add more sample trades here
];

const verificationChecks = [
  {
    id: 1,
    title: "Price Verification",
    description: "Verify if the trade price is within market range",
    autoVerifiable: true,
  },
  {
    id: 2,
    title: "Counterparty Validation",
    description:
      "Check if counterparty is approved and has required permissions",
    autoVerifiable: true,
  },
  {
    id: 3,
    title: "Trade Frequency Analysis",
    description: "Analyze trading patterns for suspicious activity",
    autoVerifiable: false,
  },
  {
    id: 4,
    title: "Market Liquidity Check",
    description: "Verify if trade volume aligns with market liquidity",
    autoVerifiable: true,
  },
  {
    id: 5,
    title: "Regulatory Compliance",
    description: "Ensure trade complies with regulatory requirements",
    autoVerifiable: false,
  },
  {
    id: 6,
    title: "Settlement Risk Assessment",
    description: "Evaluate potential settlement risks",
    autoVerifiable: true,
  },
  {
    id: 7,
    title: "Documentation Review",
    description: "Review all trade-related documentation",
    autoVerifiable: false,
  },
  {
    id: 8,
    title: "Market Impact Analysis",
    description: "Assess potential market impact of the trade",
    autoVerifiable: true,
  },
];

export default function TradeTable() {
  const [selectedTrade, setSelectedTrade] = useState<string | null>(null);
  const [verifiedChecks, setVerifiedChecks] = useState<number[]>([]);
  const [delegatedChecks, setDelegatedChecks] = useState<number[]>([]);
  const [assistClicked, setAssistClicked] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleAssist = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      const autoVerifiableChecks = verificationChecks
        .filter((check) => check.autoVerifiable)
        .map((check) => check.id);
      setVerifiedChecks(autoVerifiableChecks);
      setAssistClicked(true);
    }, 1500);
  };

  const handleDelegate = (checkId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setDelegatedChecks([...delegatedChecks, checkId]);
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid max-w-[50%] mt-2 mb-6 h-10 py-0 w-full grid-cols-3 gap-3">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        {["active", "pending", "history"].map((status) => (
          <TabsContent key={status} value={status}>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Actions</TableHead>
                    <TableHead>Trade ID</TableHead>
                    <TableHead>Counterparty ID</TableHead>
                    <TableHead>Security Type</TableHead>
                    <TableHead>Side</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Currency</TableHead>
                    <TableHead>Trade History</TableHead>
                    <TableHead>Trade Frequency</TableHead>
                    <TableHead>Market Liquidity</TableHead>
                    <TableHead>Market Volatility</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trades
                    .filter((trade) => trade.status === status)
                    .map((trade) => (
                      <TableRow key={trade.id}>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedTrade(trade.id)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </TableCell>
                        <TableCell>{trade.id}</TableCell>
                        <TableCell>{trade.counterpartyId}</TableCell>
                        <TableCell>{trade.securityType}</TableCell>
                        <TableCell>{trade.side}</TableCell>
                        <TableCell>{trade.price}</TableCell>
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
          </TabsContent>
        ))}
      </Tabs>

      <Dialog
        open={!!selectedTrade}
        onOpenChange={() => {
          setSelectedTrade(null);
          setAssistClicked(false);
          setVerifiedChecks([]);
          setDelegatedChecks([]);
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Trade Verification Checks</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {verificationChecks.map((check) => (
                <AccordionItem
                  key={check.id}
                  value={`check-${check.id}`}
                  className="border rounded-lg px-4"
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center space-x-2">
                      <span>{check.title}</span>
                      {verifiedChecks.includes(check.id) && (
                        <Badge variant="secondary" className="ml-2">
                          Verified
                        </Badge>
                      )}
                      {delegatedChecks.includes(check.id) && (
                        <Badge variant="secondary" className="ml-2">
                          Delegated
                        </Badge>
                      )}
                      {!check.autoVerifiable &&
                        assistClicked &&
                        !verifiedChecks.includes(check.id) &&
                        !delegatedChecks.includes(check.id) && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="ml-2"
                            onClick={(e) => handleDelegate(check.id, e)}
                          >
                            Delegate
                          </Button>
                        )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-2">
                    <div className="border rounded-md p-4 text-sm text-muted-foreground">
                      {check.description}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={handleAssist} disabled={showAnimation}>
              Assist
            </Button>
          </div>
          {showAnimation && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
              <div className="animate-in zoom-in-50 duration-1000">
                <div className="bg-primary rounded-full p-8">
                  <CheckCircle2 className="w-16 h-16 text-primary-foreground animate-pulse" />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
