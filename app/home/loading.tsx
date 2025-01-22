import { GeometricPattern } from "@/components/GeometricPattern";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex z-10 flex-col justify-center items-center w-full h-full">
      <div className=" flex flex-col h-full overflow-hidden px-4 pt-10 w-full items-center">
        <GeometricPattern className="-z-20"/>
        <div className="flex flex-col justify-end h-fit w-full max-w-[606px]">
          <Skeleton className="w-[128px] h-[28px]"/>
          <div className="h-4"/>
          <div className="flex flex-row w-full gap-x-4">
            <Skeleton className="flex flex-grow h-10"/>
            <Skeleton className="flex min-w-[120px] max-w-[128px] w-full h-10"/>
          </div>
          <div className="h-4"/>
        </div>
        <div className="flex flex-col w-full max-w-[606px] gap-y-4 ">
          <Skeleton className="w-full h-10 rounded-md min-h-[56px]"/>
          <Skeleton className="w-full h-10 rounded-md min-h-[56px]"/>
          <Skeleton className="w-full h-10 rounded-md min-h-[56px]"/>
          <Skeleton className="w-full h-10 rounded-md min-h-[56px]"/>
          <Skeleton className="w-full h-10 rounded-md min-h-[56px]"/>
          <Skeleton className="w-full h-10 rounded-md min-h-[56px]"/>
          <Skeleton className="w-full h-10 rounded-md min-h-[56px]"/>
        </div>
      </div>
    </div>
  )
}
