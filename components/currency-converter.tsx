"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRightLeft, RefreshCw, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";

// African currencies with their codes and symbols
const africanCurrencies = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", flag: "🇳🇬" },
  { code: "ZAR", name: "South African Rand", symbol: "R", flag: "🇿🇦" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh", flag: "🇰🇪" },
  { code: "EGP", name: "Egyptian Pound", symbol: "E£", flag: "🇪🇬" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵", flag: "🇬🇭" },
  { code: "MAD", name: "Moroccan Dirham", symbol: "DH", flag: "🇲🇦" },
  { code: "TZS", name: "Tanzanian Shilling", symbol: "TSh", flag: "🇹🇿" },
  { code: "UGX", name: "Ugandan Shilling", symbol: "USh", flag: "🇺🇬" },
  { code: "ETB", name: "Ethiopian Birr", symbol: "Br", flag: "🇪🇹" },
  { code: "XOF", name: "West African CFA", symbol: "CFA", flag: "🌍" },
  { code: "XAF", name: "Central African CFA", symbol: "FCFA", flag: "🌍" },
  { code: "RWF", name: "Rwandan Franc", symbol: "FRw", flag: "🇷🇼" },
  { code: "BWP", name: "Botswana Pula", symbol: "P", flag: "🇧🇼" },
  { code: "MUR", name: "Mauritian Rupee", symbol: "₨", flag: "🇲🇺" },
  { code: "TND", name: "Tunisian Dinar", symbol: "DT", flag: "🇹🇳" },
];

// Static exchange rates (relative to USD) - in production, use an API
const exchangeRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  NGN: 1550,
  ZAR: 18.5,
  KES: 153,
  EGP: 50.5,
  GHS: 15.8,
  MAD: 10.1,
  TZS: 2680,
  UGX: 3850,
  ETB: 127,
  XOF: 605,
  XAF: 605,
  RWF: 1350,
  BWP: 13.5,
  MUR: 45.5,
  TND: 3.12,
};

export function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("NGN");
  const [result, setResult] = useState<number>(0);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const convert = () => {
    const amountNum = Number.parseFloat(amount) || 0;
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    const converted = (amountNum / fromRate) * toRate;
    setResult(converted);
  };

  useEffect(() => {
    convert();
  }, [amount, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const fromCurrencyData = africanCurrencies.find(c => c.code === fromCurrency);
  const toCurrencyData = africanCurrencies.find(c => c.code === toCurrency);

  const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
  const isRateUp = rate > 1;

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-safari-gold" />
            Currency Converter
          </span>
          <span className="text-xs font-normal text-muted-foreground flex items-center gap-1">
            <RefreshCw className="w-3 h-3" />
            {lastUpdated.toLocaleDateString()}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* From Currency */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">From</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">
                {fromCurrencyData?.flag}
              </span>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full h-10 pl-10 pr-3 border rounded-md bg-background text-sm"
              >
                {africanCurrencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-32 text-right font-mono"
              min="0"
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="icon"
            onClick={swapCurrencies}
            className="rounded-full bg-transparent hover:bg-safari-gold/10 hover:text-safari-gold"
          >
            <ArrowRightLeft className="w-4 h-4 rotate-90" />
          </Button>
        </div>

        {/* To Currency */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">To</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg">
                {toCurrencyData?.flag}
              </span>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full h-10 pl-10 pr-3 border rounded-md bg-background text-sm"
              >
                {africanCurrencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-32 h-10 flex items-center justify-end px-3 bg-muted rounded-md font-mono text-lg font-semibold">
              {result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        {/* Exchange Rate Info */}
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Exchange Rate</span>
            <span className="flex items-center gap-1 font-medium">
              1 {fromCurrency} = {rate.toLocaleString(undefined, { maximumFractionDigits: 4 })} {toCurrency}
              {isRateUp ? (
                <TrendingUp className="w-4 h-4 text-savanna-green" />
              ) : (
                <TrendingDown className="w-4 h-4 text-kente-red" />
              )}
            </span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Rates are indicative only. Check with your bank for live rates.
        </p>
      </CardContent>
    </Card>
  );
}
