"use client"

import { useState, useEffect } from "react"
import { ArrowUpDown, Calculator } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"

interface CryptoData {
  id: string
  name: string
  symbol: string
  current_price: number
  image: string
}

interface CryptoConverterProps {
  cryptoData: CryptoData[]
}

export function CryptoConverter({ cryptoData }: CryptoConverterProps) {
  const [fromCrypto, setFromCrypto] = useState("bitcoin")
  const [toCrypto, setToCrypto] = useState("ethereum")
  const [fromAmount, setFromAmount] = useState("1")
  const [toAmount, setToAmount] = useState("0")

  const calculateConversion = () => {
    const fromCoin = cryptoData.find((coin) => coin.id === fromCrypto)
    const toCoin = cryptoData.find((coin) => coin.id === toCrypto)

    if (fromCoin && toCoin && fromAmount) {
      const fromValue = Number.parseFloat(fromAmount) * fromCoin.current_price
      const result = fromValue / toCoin.current_price
      setToAmount(result.toFixed(8))
    }
  }

  useEffect(() => {
    calculateConversion()
  }, [fromCrypto, toCrypto, fromAmount, cryptoData])

  const swapCurrencies = () => {
    setFromCrypto(toCrypto)
    setToCrypto(fromCrypto)
    setFromAmount(toAmount)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    }).format(price)
  }

  const fromCoin = cryptoData.find((coin) => coin.id === fromCrypto)
  const toCoin = cryptoData.find((coin) => coin.id === toCrypto)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Конвертер криптовалют
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* From Currency */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Из</label>
          <div className="flex gap-2">
            <Select value={fromCrypto} onValueChange={setFromCrypto}>
              <SelectTrigger className="w-48">
                <div className="flex items-center gap-2">
                  {fromCoin && (
                    <>
                      <img
                        src={fromCoin.image || "/placeholder.svg"}
                        alt={fromCoin.name}
                        className="w-4 h-4 rounded-full bg-white p-0.5"
                      />
                      <span>{fromCoin.symbol.toUpperCase()}</span>
                    </>
                  )}
                </div>
              </SelectTrigger>
              <SelectContent>
                {cryptoData.slice(0, 20).map((crypto) => (
                  <SelectItem key={crypto.id} value={crypto.id}>
                    <div className="flex items-center gap-2">
                      <img
                        src={crypto.image || "/placeholder.svg"}
                        alt={crypto.name}
                        className="w-4 h-4 rounded-full bg-white p-0.5"
                      />
                      <span className="font-medium">{crypto.symbol.toUpperCase()}</span>
                      <span className="text-xs text-muted-foreground truncate max-w-20">{crypto.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="Количество"
              className="flex-1"
            />
          </div>
          {fromCoin && (
            <p className="text-xs text-muted-foreground">
              1 {fromCoin.symbol.toUpperCase()} = {formatPrice(fromCoin.current_price)}
            </p>
          )}
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button variant="outline" size="icon" onClick={swapCurrencies}>
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>

        {/* To Currency */}
        <div className="space-y-2">
          <label className="text-sm font-medium">В</label>
          <div className="flex gap-2">
            <Select value={toCrypto} onValueChange={setToCrypto}>
              <SelectTrigger className="w-48">
                <div className="flex items-center gap-2">
                  {toCoin && (
                    <>
                      <img
                        src={toCoin.image || "/placeholder.svg"}
                        alt={toCoin.name}
                        className="w-4 h-4 rounded-full bg-white p-0.5"
                      />
                      <span>{toCoin.symbol.toUpperCase()}</span>
                    </>
                  )}
                </div>
              </SelectTrigger>
              <SelectContent>
                {cryptoData.slice(0, 20).map((crypto) => (
                  <SelectItem key={crypto.id} value={crypto.id}>
                    <div className="flex items-center gap-2">
                      <img
                        src={crypto.image || "/placeholder.svg"}
                        alt={crypto.name}
                        className="w-4 h-4 rounded-full bg-white p-0.5"
                      />
                      <span className="font-medium">{crypto.symbol.toUpperCase()}</span>
                      <span className="text-xs text-muted-foreground truncate max-w-20">{crypto.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input type="text" value={toAmount} readOnly placeholder="Результат" className="flex-1 bg-muted" />
          </div>
          {toCoin && (
            <p className="text-xs text-muted-foreground">
              1 {toCoin.symbol.toUpperCase()} = {formatPrice(toCoin.current_price)}
            </p>
          )}
        </div>

        {/* Conversion Summary */}
        {fromCoin && toCoin && fromAmount && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm">
              <span className="font-medium">
                {fromAmount} {fromCoin.symbol.toUpperCase()}
              </span>
              {" = "}
              <span className="font-medium">
                {toAmount} {toCoin.symbol.toUpperCase()}
              </span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Стоимость в USD: {formatPrice(Number.parseFloat(fromAmount) * fromCoin.current_price)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
