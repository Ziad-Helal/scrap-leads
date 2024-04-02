import { Skeleton } from "@/components/shadcn";

export const SubscriptionInfo_Modal_Skelaton = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 items-center sm:items-start">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-4 w-80" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-7 w-60" />
        <Skeleton className="h-5 w-80" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-7 w-60" />
        <div className="grid gap-2 lg:grid-cols-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
        </div>
      </div>
    </div>
  );
};
