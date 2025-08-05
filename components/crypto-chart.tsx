"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Loader2 } from "lucide-react"

interface ChartData {
  timestamp: number
  price: number
  date: string
}

interface CryptoChartProps {
  coinId: string
  coinName: string
  coinSymbol: string
  coinImage: string
  currentPrice: number
  priceChange: number
}

export function CryptoChart({ coinId, coinName, coinSymbol, coinImage, currentPrice, priceChange }: CryptoChartProps) {
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [timeRange, setTimeRange] = useState("7")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchChartData = async (days: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=${days === "1" ? "hourly" : "daily"}`,
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (!data.prices || !Array.isArray(data.prices)) {
        throw new Error("Invalid data format received")
      }

      const formattedData = data.prices.map(([timestamp, price]: [number, number]) => ({
        timestamp,
        price: Number(price.toFixed(8)),
        date: new Date(timestamp).toLocaleDateString("ru-RU", {
          month: "short",
          day: "numeric",
          ...(days === "1" ? { hour: "2-digit", minute: "2-digit" } : {}),
        }),
      }))

      setChartData(formattedData)
    } catch (error) {
      console.error("Error fetching chart data:", error)
      setError(error instanceof Error ? error.message : "Ошибка загрузки данных")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (coinId) {
      fetchChartData(timeRange)
    }
  }, [coinId, timeRange])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    }).format(price)
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-lg font-semibold">{formatPrice(payload[0].value)}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={coinImage || "/placeholder.svg"} alt={coinName} className="w-10 h-10 rounded-full bg-white p-1" />
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                {coinName}
                <span className="text-sm text-muted-foreground uppercase">({coinSymbol})</span>
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold">{formatPrice(currentPrice)}</span>
                <div className="flex items-center gap-1">
                  {priceChange >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${priceChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {priceChange >= 0 ? "+" : ""}
                    {priceChange.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            {["1", "7", "30", "90"].map((days) => (
              <Button
                key={days}
                variant={timeRange === days ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(days)}
                disabled={loading}
              >
                {days === "1" ? "1Д" : `${days}Д`}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Загрузка графика...</span>
            </div>
          </div>
        ) : error ? (
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-500 mb-2">Ошибка загрузки графика</p>
              <p className="text-sm text-muted-foreground">{error}</p>
              <Button variant="outline" size="sm" onClick={() => fetchChartData(timeRange)} className="mt-2">
                Попробовать снова
              </Button>
            </div>
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-64 flex items-center justify-center">
            <p className="text-muted-foreground">Нет данных для отображения</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} className="text-xs" tick={{ fontSize: 12 }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                className="text-xs"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value < 1 ? value.toFixed(4) : value.toFixed(0)}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke={priceChange >= 0 ? "#22c55e" : "#ef4444"}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: priceChange >= 0 ? "#22c55e" : "#ef4444" }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
