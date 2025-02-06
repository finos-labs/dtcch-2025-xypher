// types.ts

export type Trade = {
  id: string;
  quantity: number;
  price: number;
  counterparty_1: string;
  counterparty_2: string;
  execution_time?: string;
  instrumentType?: string;
  currency?: string;
  riskScore?: number;
  buy_sell?: string;
  status?: string;
};
export type flaggedTrade = Trade & {
  quantity: number;
};

