import createProject from "@/app/actions/createProject";
import { createClient } from "@/utils/supabase/server";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import React from "react";
import HeaderAuth from "@/components/header-auth";

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
        projects={projects || []}
        createProjectAction={createProject}
      />
      <SidebarInset>
        <main className="h-full flex flex-col items-center w-full overflow-hidden">
          <div className="flex-1 w-full flex flex-col items-center h-full">
            <nav className="w-full flex items-center justify-center bg-sidebar-background pl-4 border-b h-16 border-b-muted-foreground z-40">
              <SidebarTrigger className="-ml-1 md:hidden" />
              <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                  <div className="flex items-center gap-2">
                  </div>
                </div>
                <HeaderAuth/>
              </div>
            </nav>
            <div className="flex flex-col w-full h-[calc(100%-4rem)]">
              { children }
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
