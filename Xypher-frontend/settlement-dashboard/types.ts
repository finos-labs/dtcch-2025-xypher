// types.ts

export type Trade = {
  id: string,
    counterparty_1: string,
    counterparty_2: string,
    securityType: string,
    tradeType: string, // Changed 'side' to 'tradeType'
    price: number,
    timestamp: string,
    currency: string,
    tradeHistory: string,
    tradeFrequency: string,
    marketLiquidity: string,
    marketVolatility: string,
    status: string,
    quantity?: number
};