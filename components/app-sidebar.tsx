import * as React from "react"
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
import ProjectList from "./ProjectList"
import { Project } from "./ProjectCard"


type Props = {
  projects: Project[] | null
  createProjectAction: ({ name, id }: { name: string; id: string }) => Promise<void>
}
export function AppSidebar({  projects, createProjectAction, ...props }: React.ComponentProps<typeof Sidebar> & Props) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <ProjectList
                projects={projects || []}
                createProjectAction={createProjectAction}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail/>
    </Sidebar>
  )
}
