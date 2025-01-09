

type Props = {
  main: React.ReactNode
  sidebar: React.ReactNode
  children: React.ReactNode
}
export default async function Layout({ main, sidebar, children }: Props) {

  return (
    <div className="flex p-4 flex-row w-full h-full">
      {sidebar}
      {main}
    </div>
  )
}
