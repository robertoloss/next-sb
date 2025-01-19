import SideBar from "@/components/Sidebar"
import { Suspense } from "react"
import Loading from "./loading"

type Props = {
  children: React.ReactNode
}
export default async function Layout({ children }: Props) {

  return (
    <div className="flex flex-row w-screen h-screen">
      <SideBar>
        <Suspense fallback={<Loading/>}>
          { children }
        </Suspense>
      </SideBar>
    </div>
  )
}
