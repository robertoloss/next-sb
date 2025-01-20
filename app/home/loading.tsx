import { GeometricPattern } from "@/components/GeometricPattern";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col w-full h-full items-center">
      <GeometricPattern/>
      <div className="flex flex-col justify-end min-h-[140px] w-full max-w-[606px]">
        <Skeleton className="w-[128px] h-[28px]"/>
        <div className="h-4"/>
        <div className="flex flex-row w-full gap-x-4">
          <Skeleton className="flex flex-grow h-10"/>
          <Skeleton className="flex  max-w-[128px] w-full h-10"/>
        </div>
        <div className="h-4"/>
      </div>
      <div className="flex flex-col w-full max-w-[606px] gap-y-4">
        <Skeleton className="w-full h-10 rounded-md min-h-[60px]"/>
        <Skeleton className="w-full h-10 rounded-md min-h-[60px]"/>
        <Skeleton className="w-full h-10 rounded-md min-h-[60px]"/>
        <Skeleton className="w-full h-10 rounded-md min-h-[60px]"/>
        <Skeleton className="w-full h-10 rounded-md min-h-[60px]"/>
        <Skeleton className="w-full h-10 rounded-md min-h-[60px]"/>
        <Skeleton className="w-full h-10 rounded-md min-h-[60px]"/>
        <Skeleton className="w-full h-10 rounded-md min-h-[60px]"/>
      </div>
    </div>  )
}
