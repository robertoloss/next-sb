'use client'
import { Database } from "@/database.types"
import Link from "next/link"
import { Button } from "./ui/button"
import { Loader, Loader2 } from "lucide-react"

export type Project = Database['checkbox']['Tables']['Project']['Row']

type Props = {
  project: Project
}

export default function ProjectCard({ project }: Props) {

  return (
    <Link
      prefetch={true}
      href={`/home/${project.id}`}
    >
      <Button
        variant="link"
        className={`flex flex-row  rounded-xsm 
            justify-start w-full font-normal text-foreground 
       `}
      >
        <h1 className="w-fit">
          {project.name}
        </h1>
      </Button>
    </Link>
  )
}
