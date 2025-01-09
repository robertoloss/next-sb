'use client'
import { Database } from "@/database.types"
import Link from "next/link"

export type Project = Database['checkbox']['Tables']['Project']['Row']

type Props = {
  project: Project
}

export default function ProjectCard({ project }: Props) {

  return (
    <Link
      prefetch={true}
      href={`/${project.id}`}
      className="w-full p-2 h-10 bg-blue-600 transition-all hover:bg-blue-500 rounded-sm cursor-pointer"
    >
      <h1>{project.name}</h1>
    </Link>
  )
}
