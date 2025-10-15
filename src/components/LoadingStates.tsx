import { Skeleton } from "@/components/ui/skeleton";

export function NewsCardSkeleton() {
  return (
    <div className="glass rounded-xl p-6 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );
}

export function NewsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <NewsCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Banner Skeleton */}
      <Skeleton className="h-32 w-full rounded-2xl" />
      
      {/* Filters Skeleton */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-24 flex-shrink-0" />
        ))}
      </div>
      
      {/* News Grid Skeleton */}
      <NewsGridSkeleton count={6} />
    </div>
  );
}

export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
        <p className="text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  );
}

export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass rounded-xl p-4 flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
