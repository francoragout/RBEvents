import { Skeleton } from "./ui/skeleton";

export function TableSkeleton() {
  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-[32px] w-[150px] lg:w-[250px]" />
        <Skeleton className="h-[32px] w-[194px]" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-[48px]" />
        <Skeleton className="h-[57px]" />
        <Skeleton className="h-[57px]" />
        <Skeleton className="h-[57px]" />
        <Skeleton className="h-[57px]" />
        <Skeleton className="h-[57px]" />
        <Skeleton className="h-[57px]" />
        <Skeleton className="h-[57px]" />
        <Skeleton className="h-[57px]" />
        <Skeleton className="h-[57px]" />
        <Skeleton className="h-[57px]" />
      </div>

      <div className="flex justify-end">
        <Skeleton className="h-[32px] w-[493px]" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-8 lg:gap-4">
      <Skeleton className="col-span-1 lg:col-span-2 h-[444px]" />
      <Skeleton className="col-span-1 lg:col-span-3 h-[444px]" />
      <Skeleton className="col-span-1 lg:col-span-3 h-[444px]" />
    </div>
  );
}
