'use client'
import { SearchForm } from "@/components/search-form"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar"
import ProjectCard, { Project } from "./ProjectCard"
import { ComponentProps, useOptimistic } from "react"
import AddProject from "./AddProject"


type Props = {
  projects: Project[]
  createProjectAction: ({ name, id }: { name: string; id: string }) => Promise<void>
}
export function AppSidebar({  projects, createProjectAction, ...props }: ComponentProps<typeof Sidebar> & Props) {
  const [ optimisticProjects, updateOptimisticProjects ] = useOptimistic(
    projects,
    (state, { action, project }: {
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
    <Sidebar>
      <SidebarHeader className="flex flex-col p-4">
        <SearchForm />
        <AddProject
          createProject={createProjectAction} 
          updateOptimisticProjects={updateOptimisticProjects}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <div className="flex flex-col p-4 gap-y-4 w-full">
                {optimisticProjects.map(project => (
                  <ProjectCard project={project} key={project.id} />
                ))}
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail/>
    </Sidebar>
  )
}
