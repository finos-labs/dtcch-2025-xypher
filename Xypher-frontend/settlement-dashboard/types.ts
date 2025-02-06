// types.ts

export type Trade = {
  id: string;
  counterpartyId: string;
  securityType: string;
  tradeType?: "Buy" | "Sell";
  price: number;
  timestamp: string;
  currency?: string;
  tradeHistory?: string;
  tradeFrequency?: string;
  marketLiquidity?: string;
  marketVolatility?: string;
  status?: string;
};
export type flaggedTrade = Trade & {
  quantity: number;
};

export type HighValueTrade = Trade & { quantity: number };
