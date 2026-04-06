export default function DashboardLoading() {
  return (
    <div className="p-6 lg:p-8 animate-pulse">
      <div className="h-8 w-56 bg-muted rounded-lg mb-2" />
      <div className="h-4 w-72 bg-muted rounded mb-8" />
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-muted rounded-xl" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="h-64 bg-muted rounded-xl" />
        <div className="h-64 bg-muted rounded-xl" />
      </div>
    </div>
  )
}
