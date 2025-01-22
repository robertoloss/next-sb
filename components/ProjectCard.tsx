'use client'
import Link from "next/link"
import { Button } from "./ui/button"
import { Project } from "@/utils/supabase/types"
import { useSidebar } from "./ui/sidebar"

type Props = {
  project: Project
}

export default function ProjectCard({ project }: Props) {
  const { setOpenMobile} = useSidebar()

  return (
    <Link
      prefetch={true}
      href={`/home/${project.id}`}
    >
      <Button
        variant="link"
        onClick={()=>setOpenMobile(false)}
        className={`flex flex-row  rounded-xsm dark:bg-zinc-700 dark:hover:bg-zinc-600 
          justify-start w-full font-normal text-foreground border border-muted-foreground bg-zinc-200
        hover:bg-zinc-100 text-clip px-4 overflow-hidden
       `}
      >
        <h1 className="w-full whitespace-nowrap overflow-hidden text-ellipsis text-start">
          {project.name}
        </h1>
      </Button>
    </Link>
  )
}
