import SideBar from "@/components/Sidebar"

type Props = {
  children: React.ReactNode
}
export default async function Layout({ children }: Props) {

  return (
    <div className="flex flex-row w-screen h-screen">
      <SideBar>
        { children }
      </SideBar>
    </div>
  )
}
