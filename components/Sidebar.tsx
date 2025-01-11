import createProject from "@/app/actions/createProject";
import { createClient } from "@/utils/supabase/server";
import ProjectList from "@/components/ProjectList";
import { Sidebar, SidebarGroup, SidebarHeader, SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import React from "react";

export default async function SideBar({ children }: { children: React.ReactNode}) {
  const supabase = await createClient()

  const { data: { user } } = await supabase
    .auth
    .getUser()

  const { data: projects} = await supabase
    .from('Project')
    .select("*")
    .eq('user', user?.id || '')
    .order('position', { ascending: true })
    

  return (
    <SidebarProvider>
      <AppSidebar 
        projects={projects}
        createProjectAction={createProject}
      />
      <SidebarInset>
        { children }
      </SidebarInset>
    </SidebarProvider>
  )
}
