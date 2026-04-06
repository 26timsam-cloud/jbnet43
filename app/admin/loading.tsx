export default function AdminLoading() {
  return (
    <div className="p-6 lg:p-8 animate-pulse">
      <div className="h-8 w-48 bg-muted rounded-lg mb-2" />
      <div className="h-4 w-64 bg-muted rounded mb-8" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {[...Array(4)].map((_, i) => (
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
