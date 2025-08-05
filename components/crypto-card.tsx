"use client"

import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CryptoChart } from "./crypto-chart"

interface CryptoData {
  id: string
  name: string
  symbol: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  image: string
  market_cap_rank: number
}

interface CryptoCardProps {
  crypto: CryptoData
  onSelectCrypto: (crypto: CryptoData) => void
}

export function CryptoCard({ crypto, onSelectCrypto }: CryptoCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    }).format(price)
  }

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`
    }
    return `$${marketCap.toLocaleString()}`
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 border-2 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={crypto.image || "/placeholder.svg"}
                alt={crypto.name}
                className="w-10 h-10 rounded-full bg-white dark:bg-gray-100 p-1 shadow-sm"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=40&width=40&text=" + crypto.symbol.toUpperCase()
                }}
              />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">{crypto.name}</CardTitle>
              <p className="text-sm text-muted-foreground uppercase font-medium">{crypto.symbol}</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs font-semibold">
            #{crypto.market_cap_rank}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-2xl font-bold">{formatPrice(crypto.current_price)}</p>
          </div>

          <div className="flex items-center gap-2">
            {crypto.price_change_percentage_24h >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span
              className={`text-sm font-medium ${
                crypto.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {crypto.price_change_percentage_24h >= 0 ? "+" : ""}
              {crypto.price_change_percentage_24h.toFixed(2)}%
            </span>
            <span className="text-xs text-muted-foreground">24ч</span>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Рын. кап.:</span>
              <span className="font-medium">{formatMarketCap(crypto.market_cap)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Объем 24ч:</span>
              <span className="font-medium">{formatMarketCap(crypto.total_volume)}</span>
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent hover:bg-primary/5"
                onClick={() => onSelectCrypto(crypto)}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Посмотреть график
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <img
                    src={crypto.image || "/placeholder.svg"}
                    alt={crypto.name}
                    className="w-6 h-6 rounded-full bg-white dark:bg-gray-100 p-0.5"
                  />
                  График цены {crypto.name}
                </DialogTitle>
              </DialogHeader>
              <CryptoChart
                coinId={crypto.id}
                coinName={crypto.name}
                coinSymbol={crypto.symbol}
                coinImage={crypto.image}
                currentPrice={crypto.current_price}
                priceChange={crypto.price_change_percentage_24h}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}
