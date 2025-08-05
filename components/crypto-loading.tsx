export function CryptoLoading() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-muted rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-muted-foreground/20 rounded-full" />
              <div className="space-y-2">
                <div className="h-4 bg-muted-foreground/20 rounded w-20" />
                <div className="h-3 bg-muted-foreground/20 rounded w-12" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-6 bg-muted-foreground/20 rounded w-24" />
              <div className="h-4 bg-muted-foreground/20 rounded w-16" />
            </div>
            <div className="space-y-1">
              <div className="h-3 bg-muted-foreground/20 rounded" />
              <div className="h-3 bg-muted-foreground/20 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
