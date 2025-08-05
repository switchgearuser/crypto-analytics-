"use client"

import { useState, useEffect } from "react"
import { Search, TrendingUp, RefreshCw, Calculator } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { CryptoConverter } from "@/components/crypto-converter"
import { CryptoLoading } from "@/components/crypto-loading"
import { CryptoCard } from "@/components/crypto-card"

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

export default function CryptoTracker() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [filteredData, setFilteredData] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(null)

  const fetchCryptoData = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
      )
      const data = await response.json()
      setCryptoData(data)
      setFilteredData(data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Error fetching crypto data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCryptoData()
    const interval = setInterval(fetchCryptoData, 60000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const filtered = cryptoData.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredData(filtered)
  }, [searchTerm, cryptoData])

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
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold mb-2">Crypto Tracker</h1>
            <p className="text-muted-foreground mb-4">Отслеживайте курсы популярных криптовалют в реальном времени</p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>Последнее обновление: {lastUpdated.toLocaleTimeString("ru-RU")}</span>
              <Button variant="ghost" size="sm" onClick={fetchCryptoData} disabled={loading} className="h-6 w-6 p-0">
                <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <Tabs defaultValue="tracker" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="tracker" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Трекер
            </TabsTrigger>
            <TabsTrigger value="converter" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Конвертер
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tracker" className="space-y-6">
            {/* Search */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Поиск криптовалют..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="space-y-6">
                <div className="text-center py-6">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Загрузка данных...</p>
                </div>
                <CryptoLoading />
              </div>
            )}

            {/* Crypto Grid */}
            {!loading && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredData.map((crypto) => (
                  <CryptoCard key={crypto.id} crypto={crypto} onSelectCrypto={setSelectedCrypto} />
                ))}
              </div>
            )}

            {/* No Results */}
            {!loading && filteredData.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Криптовалюты не найдены по запросу "{searchTerm}"</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="converter">
            <div className="max-w-2xl mx-auto">
              <CryptoConverter cryptoData={cryptoData} />
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="text-center mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Данные предоставлены{" "}
            <a
              href="https://www.coingecko.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              CoinGecko API
            </a>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Обновление каждую минуту • Только для информационных целей
          </p>
        </footer>
      </div>
    </div>
  )
}
