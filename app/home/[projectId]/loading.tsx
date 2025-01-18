import { GeometricPattern } from "@/components/GeometricPattern";
import { Skeleton } from "@/components/ui/skeleton";


export default function ProjectLoader() {
  return (
    <div className="flex flex-row h-full justify-center w-full pt-10">
      <GeometricPattern />
      <div className="flex flex-col w-full max-w-[640px]  gap-y-4">
        {[...Array(8).keys()].map((item) => (
          <Skeleton 
            key={item}
            className="w-full h-10 rounded-md min-h-[60px]"
          />
        ))}
      </div>
    </div>
  )
}
