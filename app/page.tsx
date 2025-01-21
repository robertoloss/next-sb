import { GeometricPattern } from "@/components/GeometricPattern";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {

  return (
    <>
      <main className="flex-1 flex flex-col w-screen h-screen p-4 justify-center items-center">
        <GeometricPattern className="z-20"/>
        <div className="flex z-50 flex-col gap-y-14 justify-between">
          <div className="flex flex-col gap-y-4">
            <h1 className="text-4xl sm:text-8xl font-extrabold">
              QwikTasks
            </h1>
            <h1 className="text-lg text-center font-light">
              Version 1.0
            </h1>
          </div>
          <Link href="/home" className="self-center">
            <Button className="min-w-28">
              Enter
            </Button>
          </Link>
        </div>
      </main>
    </>
  );
}
