import { useState } from "react";
import { Eye, CheckCircle2, Info } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Trade } from "../../types";
const trades: Trade[] = [
  // Active Trades
  {
    id: "TR001",
    counterpartyId: "CP123",
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
    counterpartyId: "CP456",
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
    counterpartyId: "CP789",
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
    counterpartyId: "CP234",
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
    counterpartyId: "CP567",
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
    counterpartyId: "CP890",
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
    counterpartyId: "CP345",
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
    counterpartyId: "CP678",
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
    counterpartyId: "CP901",
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
    counterpartyId: "CP432",
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

const verificationChecks = [
  {
    id: 1,
    title: "Price Verification",
    description: "Verify if the trade price is within market range",
    autoVerifiable: true,
    pendingAction: "Awaiting market data comparison",
    delegationInfo: "Requires senior trader review for price validation",
    status: {
      pending: "verified",
      history: "verified",
    },
  },
  {
    id: 2,
    title: "Counterparty Validation",
    description:
      "Check if counterparty is approved and has required permissions",
    autoVerifiable: true,
    pendingAction: "Pending KYC verification",
    delegationInfo:
      "Needs compliance team review for counterparty verification",
    status: {
      pending: "pending",
      history: "verified",
    },
  },
  {
    id: 3,
    title: "Trade Frequency Analysis",
    description: "Analyze trading patterns for suspicious activity",
    autoVerifiable: false,
    pendingAction: "Awaiting pattern analysis",
    delegationInfo:
      "Requires risk management team analysis for pattern verification",
    status: {
      pending: "pending",
      history: "flagged",
    },
  },
  {
    id: 4,
    title: "Market Liquidity Check",
    description: "Verify if trade volume aligns with market liquidity",
    autoVerifiable: true,
    pendingAction: "Pending liquidity data",
    delegationInfo:
      "Needs market analysis team review for liquidity assessment",
    status: {
      pending: "verified",
      history: "verified",
    },
  },
  {
    id: 5,
    title: "Regulatory Compliance",
    description: "Ensure trade complies with regulatory requirements",
    autoVerifiable: false,
    pendingAction: "Awaiting compliance review",
    delegationInfo:
      "Requires compliance officer review for regulatory validation",
    status: {
      pending: "pending",
      history: "flagged",
    },
  },
  {
    id: 6,
    title: "Settlement Risk Assessment",
    description: "Evaluate potential settlement risks",
    autoVerifiable: true,
    pendingAction: "Pending risk calculation",
    delegationInfo: "Needs settlement team review for risk assessment",
    status: {
      pending: "verified",
      history: "verified",
    },
  },
  {
    id: 7,
    title: "Documentation Review",
    description: "Review all trade-related documentation",
    autoVerifiable: false,
    pendingAction: "Awaiting document verification",
    delegationInfo: "Requires legal team review for documentation validation",
    status: {
      pending: "pending",
      history: "verified",
    },
  },
  {
    id: 8,
    title: "Market Impact Analysis",
    description: "Assess potential market impact of the trade",
    autoVerifiable: true,
    pendingAction: "Pending market analysis",
    delegationInfo: "Needs market analysis team review for impact assessment",
    status: {
      pending: "verified",
      history: "verified",
    },
  },
];

export default function TradeTable() {
  const [selectedTrade, setSelectedTrade] = useState<string | null>(null);
  const [verifiedChecks, setVerifiedChecks] = useState<number[]>([]);
  const [delegatedChecks, setDelegatedChecks] = useState<number[]>([]);
  const [assistClicked, setAssistClicked] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [selectedSection, setSelectedSection] = useState("active");

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

  const renderActiveCheckStatus = (check: (typeof verificationChecks)[0]) => {
    if (verifiedChecks.includes(check.id)) {
      return <Badge variant="secondary">Verified</Badge>;
    }
    if (delegatedChecks.includes(check.id)) {
      return <Badge variant="secondary">Delegated</Badge>;
    }
    if (!check.autoVerifiable && assistClicked) {
      return (
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{check.delegationInfo}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => handleDelegate(check.id, e)}
          >
            Delegate
          </Button>
        </div>
      );
    }
    return null;
  };

  const renderPendingCheckStatus = (check: (typeof verificationChecks)[0]) => {
    const status = check.status.pending;
    if (status === "verified") {
      return <Badge variant="secondary">Verified</Badge>;
    }
    return (
      <div className="flex items-center gap-2">
        <Badge
          variant="secondary"
          className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
        >
          Pending
        </Badge>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{check.pendingAction}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  };

  const renderHistoryCheckStatus = (check: (typeof verificationChecks)[0]) => {
    const status = check.status.history;
    return (
      <Badge
        variant="secondary"
        className={cn(
          status === "flagged"
            ? "bg-red-500/20 text-red-700 dark:text-red-400"
            : "bg-green-500/20 text-green-700 dark:text-green-400"
        )}
      >
        {status === "flagged" ? "Flagged" : "Verified"}
      </Badge>
    );
  };

  const renderCheckStatus = (
    check: (typeof verificationChecks)[0],
    section: string
  ) => {
    switch (section) {
      case "active":
        return renderActiveCheckStatus(check);
      case "pending":
        return renderPendingCheckStatus(check);
      case "history":
        return renderHistoryCheckStatus(check);
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <Tabs
        defaultValue="active"
        className="w-full"
        onValueChange={(value) => {
          setSelectedSection(value);
          setAssistClicked(false);
          setVerifiedChecks([]);
          setDelegatedChecks([]);
        }}
      >
        <TabsList className="grid max-w-[50vw] mt-2 mb-6 h-10 py-0 w-full grid-cols-3 gap-3">
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
                    <TableHead>Trade Type</TableHead>
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
                        <TableCell>{trade.tradeType}</TableCell>
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
                      {renderCheckStatus(check, selectedSection)}
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
          {selectedSection === "active" && (
            <div className="mt-4 flex justify-end">
              <Button onClick={handleAssist} disabled={showAnimation}>
                Assist
              </Button>
            </div>
          )}
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
