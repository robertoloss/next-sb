'use client'
import { useOptimistic } from "react"
import AddProject from "./AddProject"
import ProjectCard from "./ProjectCard"
import { Project } from "@/utils/supabase/types"

export type UpdateOptimisticProjects =  (action: {
    action: string;
    projectId?: string;
    project?: Project;
}) => void
type Props = {
  projects: Project[]
  createProjectAction: ({ name, id }: { name: string; id: string }) => Promise<void>
}
export default function ProjectList({ projects, createProjectAction }: Props) {
  const [ optimisticProjects, updateOptimisticProjects ] = useOptimistic(
    projects,
    (state, { action, projectId, project }: {
      action: string,
      projectId?: string,
      project?: Project
    }) => {
      switch (action) {
        case 'create':
          return project ? [ project, ...state ] : state
        default:
         return []
      }
    }
  )

  return (
    <div className="flex flex-col p-4 gap-y-4 w-full">
      <AddProject 
        createProject={createProjectAction} 
        updateOptimisticProjects={updateOptimisticProjects}
      />
      {optimisticProjects.map(project => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </div>
  )

}
