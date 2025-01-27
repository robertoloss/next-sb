'use client'
import emailjs from '@emailjs/browser'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import ProjectCard from "./ProjectCard"
import { Project } from "@/utils/supabase/types"
import { ComponentProps, useEffect, useOptimistic } from "react"
import { AddProjectModal } from "./AddProjectModal"
import { Button } from "./ui/button"
import Link from "next/link"
import { Home } from "lucide-react"
import { useAppStore } from "@/utils/zustand/store"


type Props = {
  projects: Project[]
  createProjectAction: ({ name, id }: { name: string; id: string }) => Promise<void>
}
export function AppSidebar({  projects, createProjectAction }: ComponentProps<typeof Sidebar> & Props) {
  const { setUpdateProjects } = useAppStore()
  const { setOpenMobile} = useSidebar()
  const [ optimisticProjects, updateOptimisticProjects ] = useOptimistic(
    projects,
    (state, { action, project }: {
      action: string,
      projectId?: string,
      project?: Project
    }) => {
      switch (action) {
        case 'create':
          return project ? [ ...state, project ] : state
        case 'update':
          return project ? [
            ...state.filter(p => p.id !== project.id), project
          ] : state
        default:
         return []
      }
    }
  )
  useEffect(()=>{
    setUpdateProjects(updateOptimisticProjects)
  },[updateOptimisticProjects])
  

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col p-4 border-r border-r-muted-foreground">
        <Link 
          href={'/home'}
          className="flex flex-row justify-center hover:text-muted-foreground transition-all"
          onClick={()=>setOpenMobile(false)}
        >
          <Home/>
        </Link>
      </SidebarHeader>
      <SidebarContent className="tasklist border-r border-r-muted-foreground">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <div className="flex flex-col p-4 gap-y-4 w-full">
                {optimisticProjects
                  .sort((a,b)=> new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                  .map(project => (
                    <ProjectCard project={project} key={project.id} />
                  ))
                }
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className=" border-r p-6 border-r-muted-foreground">
        <AddProjectModal
          createProject={createProjectAction} 
          updateOptimisticProjects={updateOptimisticProjects}
          numberOfProjects={optimisticProjects.length}
        >
          <Button 
            className={`
              flex flex-row rounded-xsm 
              justify-center w-full font-normal text bg-foreground hover:bg-foreground/90 border border-background
              transition-all
           `}
          >
            New Project +
          </Button>
        </AddProjectModal>
      </SidebarFooter>
      <SidebarRail/>
    </Sidebar>
  )
}
