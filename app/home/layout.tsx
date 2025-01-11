import SideBar from "@/components/Sidebar"

type Props = {
  children: React.ReactNode
}
export default async function Layout({ children }: Props) {

  return (
    <div className="flex p-4 flex-row w-full h-full">
      <SideBar>
      { children }
      </SideBar>
    </div>
  )
}
