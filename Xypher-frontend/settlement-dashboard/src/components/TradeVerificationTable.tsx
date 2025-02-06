import { useEffect, useState } from "react";
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
import axios from "axios";
import { Trade } from "types";
import { toast, useToast } from "@/hooks/use-toast";
import { Toast } from "@radix-ui/react-toast";
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
interface RawTradeData {
  trade_id: string;
  trade_date: string;
  execution_time: string;
  counterparty_1_name: string;
  counterparty_1_account_id: string;
  counterparty_1_country: string;
  counterparty_2_name: string;
  counterparty_2_account_id: string;
  counterparty_2_country: string;
  instrument_type: string;
  instrument_CUSIP: string;
  trade_quantity: number;
  trade_price: string;
  trade_currency: string;
  trade_notional_value: string;
  settlement_date: string;
  settlement_currency: string;
  settlement_status: string;
  clearing_house_source: string;
  settlement_account_number: string;
  trade_reference_id: string;
  source_system: string;
  last_updated: string;
  risk_score: string;
  buy_or_sell: string;
}

export default function TradeTable() {
  const [selectedTrade, setSelectedTrade] = useState<string | null>(null);
  const [verifiedChecks, setVerifiedChecks] = useState<number[]>([]);
  const [delegatedChecks, setDelegatedChecks] = useState<number[]>([]);
  const [assistClicked, setAssistClicked] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [selectedSection, setSelectedSection] = useState("Pending");
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const mapApiToTrade = (data: any) => {
    return {
      id: data.trade_reference_id,
      quantity: data.trade_quantity,
      price: data.trade_price,
      counterparty_1: data.counterparty_1_account_id,
      counterparty_2: data.counterparty_2_account_id,
      execution_time: data.execution_time,
      instrumentType: data.instrument_CUSIP,
      currency: data.trade_currency,
      riskScore: data.risk_score,
      buy_sell: data.buy_or_sell,
      status: data.settlement_status,
    };
  };
  //   const transformTradeData = (rawData: RawTradeData): TradeJSON => {
  //     return {
  //       trade_id: rawData.trade_id,
  //       trade_date: rawData.trade_date,
  //       execution_time: rawData.execution_time,
  //       counterparty_1: {
  //         name: rawData.counterparty_1_name,
  //         account_id: rawData.counterparty_1_account_id,
  //         country: rawData.counterparty_1_country,
  //       },
  //       counterparty_2: {
  //         name: rawData.counterparty_2_name,
  //         account_id: rawData.counterparty_2_account_id,
  //         country: rawData.counterparty_2_country,
  //       },
  //       instrument: {
  //         type: rawData.instrument_type,
  //         symbol: rawData.instrument_CUSIP, // Assuming the CUSIP represents the symbol
  //         ISIN: rawData.instrument_CUSIP, // Assuming the CUSIP is used as ISIN here
  //       },
  //       trade_details: {
  //         quantity: rawData.trade_quantity,
  //         price: parseFloat(rawData.trade_price),
  //         trade_currency: rawData.trade_currency,
  //         notional_value: parseFloat(rawData.trade_notional_value),
  //       },
  //       settlement_details: {
  //         settlement_date: rawData.settlement_date,
  //         settlement_currency: rawData.settlement_currency,
  //         status: rawData.settlement_status,
  //         settlement_instructions: {
  //           bank_name: rawData.clearing_house_source, // Assuming clearing house source as bank name
  //           account_number: rawData.settlement_account_number,
  //         },
  //       },
  //       trade_metadata: {
  //         trade_reference_id: rawData.trade_reference_id,
  //         source_system: rawData.source_system,
  //         last_updated: rawData.last_updated,
  //         risk_score: parseFloat(rawData.risk_score),
  //       },
  //     };
  //   };

  //   console.log("Trade", trades);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://34.210.26.211:8000/get_trade/")
      .then((response) => {
        setTrades(
          response.data.map((data: RawTradeData) => mapApiToTrade(data))
        );
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleAssist = () => {
    // axios
    //   .post(
    //     "https://dap2brd807.execute-api.us-west-2.amazonaws.com/tradeVerification",
    //     transformTradeData(
    //       tempTrades.filter(
    //         (trade) => trade.trade_reference_id === selectedTrade
    //       )[0]
    //     )
    //   )
    //   .then((resp) => console.log(JSON.parse(resp.data.response)));
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
  const handleSubmitApproval = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      const autoVerifiableChecks = verificationChecks
        .filter((check) => check.autoVerifiable)
        .map((check) => check.id);
      setVerifiedChecks(autoVerifiableChecks);
      setAssistClicked(true);
      setTrades((prev) =>
        prev.map((trade) => {
          if (trade.id === selectedTrade) trade.status = "Failed";
          return trade;
        })
      );
      setSelectedTrade("");
    }, 1500);
  };

  const handleDelegate = (
    check: (typeof verificationChecks)[0],
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setDelegatedChecks([...delegatedChecks, check.id]);
    toast({
      title: `Task ${check.title} delegated`,
      description: `Task ${check.title} for ${check.description} has been delegated to concerned groups`,
    });
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
            onClick={(e) => handleDelegate(check, e)}
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
      case "Pending":
        return renderActiveCheckStatus(check);
      case "Failed":
        return renderPendingCheckStatus(check);
      case "Completed":
        return renderHistoryCheckStatus(check);
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <Tabs
        defaultValue="Pending"
        className="w-full"
        onValueChange={(value) => {
          setSelectedSection(value);
          setAssistClicked(false);
          setVerifiedChecks([]);
          setDelegatedChecks([]);
        }}
      >
        <TabsList className="grid max-w-[50vw] mt-2 mb-6 h-10 py-0 w-full grid-cols-3 gap-3">
          <TabsTrigger value="Pending">Active</TabsTrigger>
          <TabsTrigger value="Failed">Pending</TabsTrigger>
          <TabsTrigger value="Completed">History</TabsTrigger>
        </TabsList>
        {["Pending", "Failed", "Completed"].map((status) => (
          <TabsContent key={status} value={status}>
            <div className="rounded-md border">
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
                {loading ? (
                  <div justify-center items-center>
                    {" "}
                    Loading ...{" "}
                  </div>
                ) : (
                  <TableBody>
                    {trades
                      .filter((trade) => {
                        return trade.status === status;
                      })
                      .map((trade) => {
                        console.log("Hello", trade);
                        return (
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
                        );
                      })}
                  </TableBody>
                )}
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Trade Verification Checks</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {verificationChecks.map((check) => (
                <AccordionItem
                  key={check.id}
                  value={`check-${check.id}`}
                  className="border rounded-lg p-2"
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
          {selectedSection === "Pending" && (
            <div className="mt-4 gap-4 flex justify-end">
              <Button
                onClick={handleSubmitApproval}
                disabled={delegatedChecks.length < 3}
              >
                Submit For Approval
              </Button>
              <Button onClick={handleAssist} disabled={showAnimation}>
                AI Assist
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
