"use client";

import { usePathname } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

export function TableSkeleton() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col w-full space-y-4">
      {pathname === "/admin/events" && (
        <div className="flex justify-between">
          <Skeleton className="h-[32px] w-[150px] lg:w-[250px]" />
          <Skeleton className="h-[32px] w-[256px]" />
        </div>
      )}
      {pathname === "/admin/events/archived" && (
        <div className="flex justify-between">
          <Skeleton className="h-[32px] w-[150px] lg:w-[250px]" />
          <Skeleton className="h-[32px] w-[230px]" />
        </div>
      )}
      {pathname === "/admin/providers" && (
        <div className="flex justify-between">
          <Skeleton className="h-[32px] w-[150px] lg:w-[250px]" />
          <Skeleton className="h-[32px] w-[108px]" />
        </div>
      )}
      {pathname === "/admin/users" && (
        <div className="flex">
          <Skeleton className="h-[32px] w-[150px] lg:w-[250px]" />
        </div>
      )}

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
    <div className="grid grid-cols-1 gap-y-4 md:grid-cols-12 md:gap-4 lg:grid-cols-8 lg:gap-4">
      <Skeleton className="col-span-1 md:col-span-5 lg:col-span-2 h-[444px]" />
      <Skeleton className="col-span-1 md:col-span-7 lg:col-span-3 h-[444px]" />
      <Skeleton className="col-span-1 md:col-span-7 lg:col-span-3 h-[444px] md:h-[358px] lg:h-[444px]" />
      <Skeleton className="col-span-1 md:col-span-5 lg:col-span-2 h-[358px]" />
      <Skeleton className="col-span-1 md:col-span-12 lg:col-span-6 h-[358px]" />
    </div>
  );
}

export function EventFormSkeleton() {
  return <Skeleton className="h-[532px] w-full" />;
}

export default function ProviderFormSkeleton() {
  return <Skeleton className="h-[826px] w-full" />;
}
