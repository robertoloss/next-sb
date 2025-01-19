import { GeometricPattern } from "@/components/GeometricPattern";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col w-full h-full items-center">
      <GeometricPattern/>
      <div className="flex flex-col w-full max-w-[640px] pt-10 gap-y-4">
        <Skeleton className="w-full h-10 rounded-md min-h-[60px]"/>
        <Skeleton className="w-full h-10 rounded-md min-h-[60px]"/>
        <Skeleton className="w-full h-10 rounded-md min-h-[60px]"/>
        <Skeleton className="w-full h-10 rounded-md min-h-[60px]"/>
        <Skeleton className="w-full h-10 rounded-md min-h-[60px]"/>
        <Skeleton className="w-full h-10 rounded-md min-h-[60px]"/>
        <Skeleton className="w-full h-10 rounded-md min-h-[60px]"/>
        <Skeleton className="w-full h-10 rounded-md min-h-[60px]"/>
      </div>
    </div>
  )
}
