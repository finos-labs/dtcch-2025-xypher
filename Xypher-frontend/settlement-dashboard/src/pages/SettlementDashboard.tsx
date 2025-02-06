import { CashFlowCard } from "@/components/CashFlowCard";
import { CashFlowChart } from "@/components/CashflowPredictionsChart";
import { TradeErrorsChart } from "@/components/ErrorDetectionTypes";
import { FlaggedTradesCard } from "@/components/FlaggedTrades";
import { HighValueTrades } from "@/components/HighValueTrades";
import { TradeSimulation } from "@/components/TradeSimulation";
import TradeTable from "@/components/TradeVerificationTable";
import { Shield } from "lucide-react";

const SettlementDashboard = () => {
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
      <div className="flex flex-row gap-4 w-full h-[100%] min-h-fit bg-background transition-colors">
        <div className="  grow-3 h-[100%] max-h-[50vh] overflow-auto rounded-lg border bg-background">
          <div className="container flex items-center px-4">
            <div className="flex items-center space-x-2">
              <Shield className="mt-6 h-6 w-6" />
              <h1 className="mt-6 text-xl font-bold">
                Trade Verification System
              </h1>
            </div>
          </div>
          <div className="max-h-[100%] container mx-auto py-8 px-4 overflow-y-auto">
            <TradeTable />
          </div>
        </div>
        <div className=" grow-1 flex rounded-lg border  min-w-fit items-center justify-center p-4">
          <TradeSimulation />
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
